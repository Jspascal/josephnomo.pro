<template>
  <section class="portfolio">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-prefix">~/</span>portfolio
        </h2>
        <p class="section-description">
          Technical articles and case studies from my experience
        </p>
      </div>
      
      <div class="articles-grid">
        <article-card 
          v-for="(article, index) in articles" 
          :key="index"
          :article="article"
          @click="openArticle(article)"
        />
      </div>
      
      <article-modal 
        v-if="selectedArticle" 
        :article="selectedArticle" 
        @close="closeArticle"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue';
import ArticleModal from '@/components/ArticleModal.vue';
import { onMounted } from 'vue';
import { generateSEOMeta } from '@/services/seo';
import { useHead } from '@vueuse/head';

const selectedArticle = ref(null);

watch(selectedArticle, (article) => {
  useHead(generateSEOMeta(article));
});

const openArticle = (article) => {
  selectedArticle.value = article;
  document.body.classList.add('no-scroll');
};

const closeArticle = () => {
  selectedArticle.value = null;
  document.body.classList.remove('no-scroll');
};

const articles = ref([
  {
    id: 1,
    title: 'Building Resilient Microservices Communication with Redis Event Streams',
    date: 'March 23, 2025',
    summary: 'How to implement a robust event-driven architecture for microservices using Redis Streams and Laravel, with event tracking and replay capabilities.',
    tags: ['Microservices', 'Redis', 'Laravel', 'Event-Driven'],
    image: '/queue-consumers.jpg',
    category: 'Architecture',
    canonicalUrl: 'https://josephnomo.pro/portfolio/redis-streams-microservices',
    author: {
      name: 'Joseph Nomo',
      url: 'https://josephnomo.pro',
      twitter: '@CodeHacker237'
    },
    readTime: '15 min read',
    lastUpdated: '2025-03-28',
    content: `
# Building Resilient Microservices Communication with Redis Event Streams

In a microservices architecture, reliable communication between services is crucial. Traditional REST APIs create tight coupling, while message queues can lead to message loss if not properly configured. Redis Streams offers a compelling alternative, providing persistent, ordered event logs with consumer group support.

## The Challenge

For my project GVEO, I was facing a challenge when designing the microservices ecosystem:

1. **Event Ordering**: Ensuring events are processed in the correct sequence
2. **Service Resilience**: Allowing services to recover after downtime without missing events
3. **New Service Integration**: Enabling new services to "catch up" on historical events
4. **Scalability**: Supporting multiple instances of the same service without duplicate processing

## Solution: Redis Streams with Event Tracking

I implemented a solution using Redis Streams as the event backbone, with each service maintaining a record of processed events. Here's how I built it:

### 1. Event Producer Implementation

First, created a service to publish events to Redis Streams:

\`\`\`php
<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Redis;
use App\\Contracts\\EventPublisherInterface;

class RedisEventPublisher implements EventPublisherInterface
{
    private $redis;
    
    public function __construct()
    {
        $this->redis = Redis::connection('events');
    }
    
    public function publish(string $stream, array $event): string
    {
        // Add event metadata
        $event['published_at'] = now()->toIso8601String();
        $event['publisher_id'] = config('app.service_id');
        
        // Publish to Redis Stream and return the event ID
        return $this->redis->xAdd(
            $stream,
            '*', // Auto-generate ID based on timestamp
            $event
        );
    }
}
\`\`\`

### 2. Consumer Group Management

Next, implemented a service to manage consumer groups and track event processing:

\`\`\`php
<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Redis;
use Illuminate\\Support\\Facades\\Log;

class EventConsumerManager
{
    private $redis;
    private $serviceId;
    private $consumerGroup;
    
    public function __construct()
    {
        $this->redis = Redis::connection('events');
        $this->serviceId = config('app.service_id');
        $this->consumerGroup = config('events.consumer_group', 'default-group');
    }
    
    public function registerConsumerGroup(string $stream): void
    {
        try {
            // Create the consumer group if it doesn't exist
            // The '0' means start from the beginning of the stream
            $this->redis->xGroup('CREATE', $stream, $this->consumerGroup, '0', 'MKSTREAM');
        } catch (\\Exception $e) {
            // Group may already exist, which is fine
            Log::info("Consumer group registration: {$e->getMessage()}");
        }
    }
    
    public function getUnprocessedEvents(string $stream, int $count = 10): array
    {
        // Get events that haven't been processed by this consumer yet
        return $this->redis->xReadGroup(
            $this->consumerGroup,
            $this->serviceId,
            [$stream => '>'], // '>' means all new messages not yet delivered to this consumer
            $count
        );
    }
    
    public function acknowledgeEvent(string $stream, string $eventId): void
    {
        // Mark event as processed
        $this->redis->xAck($stream, $this->consumerGroup, [$eventId]);
        
        // Store the last processed event ID in a Redis hash for recovery
        $this->redis->hSet(
            "service:{$this->serviceId}:processed_events",
            $stream,
            $eventId
        );
    }
    
    public function getLastProcessedEventId(string $stream): ?string
    {
        // Get the last processed event ID for this service and stream
        return $this->redis->hGet(
            "service:{$this->serviceId}:processed_events",
            $stream
        );
    }
    
    public function replayEventsFromId(string $stream, string $fromId, int $count = 100): array
    {
        // Get historical events starting from a specific ID
        return $this->redis->xRange(
            $stream,
            $fromId,
            '+', // '+' means up to the latest event
            $count
        );
    }
}
\`\`\`

### 3. Event Consumer Implementation

Then, created a base consumer class that services could extend:

\`\`\`php
<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Log;
use App\\Services\\EventConsumerManager;

abstract class BaseEventConsumer
{
    protected $consumerManager;
    protected $stream;
    protected $batchSize = 10;
    
    public function __construct(EventConsumerManager $consumerManager)
    {
        $this->consumerManager = $consumerManager;
    }
    
    public function initialize(): void
    {
        // Register the consumer group for this stream
        $this->consumerManager->registerConsumerGroup($this->stream);
    }
    
    public function processNewEvents(): int
    {
        $events = $this->consumerManager->getUnprocessedEvents($this->stream, $this->batchSize);
        
        if (empty($events)) {
            return 0;
        }
        
        $count = 0;
        
        foreach ($events[$this->stream] ?? [] as $eventId => $eventData) {
            try {
                // Process the event
                $this->handleEvent($eventId, $eventData);
                
                // Acknowledge the event
                $this->consumerManager->acknowledgeEvent($this->stream, $eventId);
                
                $count++;
            } catch (\\Exception $e) {
                Log::error("Error processing event {$eventId}: {$e->getMessage()}");
                // Don't acknowledge - will be redelivered later
            }
        }
        
        return $count;
    }
    
    public function recoverFromLastProcessed(): int
    {
        $lastProcessedId = $this->consumerManager->getLastProcessedEventId($this->stream);
        
        if (!$lastProcessedId) {
            // No recovery needed
            return 0;
        }
        
        // Get events after the last processed one
        $events = $this->consumerManager->replayEventsFromId($this->stream, $lastProcessedId);
        
        if (empty($events)) {
            return 0;
        }
        
        $count = 0;
        
        foreach ($events as $eventId => $eventData) {
            // Skip the last processed event
            if ($eventId === $lastProcessedId) {
                continue;
            }
            
            try {
                // Process the event
                $this->handleEvent($eventId, $eventData);
                
                // Acknowledge the event
                $this->consumerManager->acknowledgeEvent($this->stream, $eventId);
                
                $count++;
            } catch (\\Exception $e) {
                Log::error("Error recovering event {$eventId}: {$e->getMessage()}");
                break; // Stop processing on error during recovery
            }
        }
        
        return $count;
    }
    
    abstract protected function handleEvent(string $eventId, array $eventData): void;
}
\`\`\`

### 4. Implementing a Specific Service Consumer

Finally, created concrete consumers for each service:

\`\`\`php
<?php

namespace App\\Consumers;

use App\\Services\\BaseEventConsumer;
use App\\Services\\EventConsumerManager;
use App\\Models\\VehicleEvent;

class VehicleEventConsumer extends BaseEventConsumer
{
    protected $stream = 'vehicle-events';
    
    public function __construct(EventConsumerManager $consumerManager)
    {
        parent::__construct($consumerManager);
    }
    
    protected function handleEvent(string $eventId, array $eventData): void
    {
        $eventType = $eventData['event_type'] ?? null;
        
        switch ($eventType) {
            case 'vehicle.created':
                $this->handleVehicleCreated($eventData);
                break;
                
            case 'vehicle.updated':
                $this->handleVehicleUpdated($eventData);
                break;
                
            case 'vehicle.maintenance.scheduled':
                $this->handleMaintenanceScheduled($eventData);
                break;
                
            default:
                // Log unknown event type
                break;
        }
    }
    
    private function handleVehicleCreated(array $eventData): void
    {
        // Implementation details...
    }
    
    private function handleVehicleUpdated(array $eventData): void
    {
        // Implementation details...
    }
    
    private function handleMaintenanceScheduled(array $eventData): void
    {
        // Implementation details...
    }
}
\`\`\`

### 5. Scheduling Event Processing

Used Laravel's scheduler to regularly process events:

\`\`\`php
<?php

namespace App\\Console\\Commands;

use Illuminate\\Console\\Command;
use App\\Consumers\\VehicleEventConsumer;

class ProcessVehicleEvents extends Command
{
    protected $signature = 'events:process-vehicles';
    protected $description = 'Process vehicle events from Redis Stream';
    
    private $consumer;
    
    public function __construct(VehicleEventConsumer $consumer)
    {
        parent::__construct();
        $this->consumer = $consumer;
    }
    
    public function handle()
    {
        $this->consumer->initialize();
        
        // First, recover any missed events
        $recoveredCount = $this->consumer->recoverFromLastProcessed();
        if ($recoveredCount > 0) {
            $this->info("Recovered {$recoveredCount} missed events");
        }
        
        // Then process new events
        $processedCount = $this->consumer->processNewEvents();
        $this->info("Processed {$processedCount} new events");
        
        return 0;
    }
}
\`\`\`

## Results and Benefits

This implementation provided several key benefits for GVEO's fleet management system:

1. **Resilience**: Services could go down and recover without missing vehicle events
2. **Event Replay**: New services could replay historical events to build their state
3. **Scalability**: Multiple instances of the same service could process events without duplication
4. **Monitoring**: We could track event processing across services
5. **Decoupling**: Services only needed to know about event formats, not about other services

## Conclusion

Redis Streams provides an excellent foundation for event-driven microservices communication. By combining it with a tracking mechanism for processed events, I created a robust system that could handle service failures, new service onboarding, and scaling with minimal complexity.

This approach has significantly improved the reliability of GVEO's microservices ecosystem while reducing the operational burden of managing inter-service communication.
    `,
  },
  {
    id: 2,
    title: 'Building Spatial Data Tables for Fleet Analytics',
    date: 'March 15, 2025',
    summary: 'A case study on building efficient analytics for fleet management by consuming data from diverse services and creating denormalized spatial tables for high-performance queries.',
    tags: ['Data Engineering', 'Analytics', 'Fleet Management', 'Performance'],
    image: '/spatial-db.jpg',
    category: 'Data Engineering',
    canonicalUrl: 'https://josephnomo.pro/portfolio/spatial-data-analytics',
    author: {
      name: 'Joseph Nomo',
      url: 'https://josephnomo.pro',
      twitter: '@CodeHacker237'
    },
    readTime: '12 min read',
    lastUpdated: '2025-03-20',
    content: `
# Building Spatial Data Tables for Fleet Analytics

In a microservices architecture, data is distributed across multiple services, making analytics and reporting challenging. Each service owns its domain data, but comprehensive analytics often require data from multiple domains. Traditional approaches like joining tables across services lead to performance issues and tight coupling.

## The Challenge

When decoupling my app GVEO, the fleet analytics service needed to generate reports combining data from multiple domains:

1. **Maintenance data** from the maintenance service
2. **Repair data** from the workshop service
3. **Fuel consumption data** from the fuel tracking service
4. **Vehicle data** from the fleet management service
5. **Driver data** from the personnel service

The initial approach of making API calls to each service resulted in:

- High latency for reports (1-3 seconds)
- Increased load on operational services
- Timeouts during peak periods
- Complex error handling for partial service failures

## Solution: Spatial Data Tables

I implemented a solution using "spatial data tables" - denormalized tables containing all data needed for specific analytics queries without requiring joins. These tables were populated through scheduled commands that consumed data from various services.

### 1. Defining the Spatial Table Structure

First, I designed a comprehensive spatial table for vehicle cost analytics:

\`\`\`php
<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class CreateVehicleCostAnalyticsTable extends Migration
{
    public function up()
    {
        Schema::create('vehicle_cost_analytics', function (Blueprint $table) {
            // Primary key
            $table->uuid('id')->primary();
            
            // Time dimension
            $table->date('date');
            $table->integer('year');
            $table->integer('month');
            $table->integer('quarter');
            
            // Vehicle dimension
            $table->uuid('vehicle_id');
            $table->string('vehicle_plate');
            $table->string('vehicle_model');
            $table->string('vehicle_brand');
            $table->string('vehicle_type');
            $table->date('vehicle_purchase_date');
            $table->integer('vehicle_age_years');
            
            // Driver dimension
            $table->uuid('driver_id')->nullable();
            $table->string('driver_name')->nullable();
            $table->string('driver_department')->nullable();
            
            // Location dimension
            $table->uuid('location_id')->nullable();
            $table->string('location_name')->nullable();
            $table->string('location_city')->nullable();
            $table->string('location_country')->nullable();
            
            // Maintenance metrics
            $table->integer('maintenance_count')->default(0);
            $table->decimal('maintenance_cost', 10, 2)->default(0);
            $table->integer('scheduled_maintenance_count')->default(0);
            $table->integer('unscheduled_maintenance_count')->default(0);
            
            // Repair metrics
            $table->integer('repair_count')->default(0);
            $table->decimal('repair_cost', 10, 2)->default(0);
            $table->integer('mechanical_repair_count')->default(0);
            $table->integer('electrical_repair_count')->default(0);
            $table->integer('body_repair_count')->default(0);
            
            // Fuel metrics
            $table->decimal('fuel_liters', 10, 2)->default(0);
            $table->decimal('fuel_cost', 10, 2)->default(0);
            $table->decimal('kilometers_driven', 10, 2)->default(0);
            $table->decimal('fuel_efficiency', 10, 2)->nullable();
            
            // Total cost metrics
            $table->decimal('total_cost', 10, 2)->default(0);
            $table->decimal('cost_per_kilometer', 10, 2)->nullable();
            
            // Indexes for common query patterns
            $table->index(['year', 'month']);
            $table->index('vehicle_id');
            $table->index('vehicle_brand');
            $table->index('vehicle_type');
            $table->index('driver_id');
            $table->index('location_id');
            
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('vehicle_cost_analytics');
    }
}
\`\`\`

### 2. Data Collection Commands

Created commands to collect and process data from various services:

\`\`\`php
<?php

namespace App\\Console\\Commands;

use Illuminate\\Console\\Command;
use App\\Services\\MaintenanceDataService;
use App\\Services\\RepairDataService;
use App\\Services\\FuelDataService;
use App\\Services\\VehicleDataService;
use App\\Services\\DriverDataService;
use App\\Services\\SpatialDataBuilder;
use Carbon\\Carbon;

class BuildVehicleCostAnalytics extends Command
{
    protected $signature = 'analytics:build-vehicle-costs {--from=} {--to=} {--vehicle=} {--rebuild}';
    protected $description = 'Build or update the vehicle cost analytics spatial data';
    
    private $maintenanceService;
    private $repairService;
    private $fuelService;
    private $vehicleService;
    private $driverService;
    private $spatialDataBuilder;
    
    public function __construct(
        MaintenanceDataService $maintenanceService,
        RepairDataService $repairService,
        FuelDataService $fuelService,
        VehicleDataService $vehicleService,
        DriverDataService $driverService,
        SpatialDataBuilder $spatialDataBuilder
    ) {
        parent::__construct();
        $this->maintenanceService = $maintenanceService;
        $this->repairService = $repairService;
        $this->fuelService = $fuelService;
        $this->vehicleService = $vehicleService;
        $this->driverService = $driverService;
        $this->spatialDataBuilder = $spatialDataBuilder;
    }
    
    public function handle()
    {
        $fromDate = $this->option('from') ? Carbon::parse($this->option('from')) : Carbon::now()->subMonths(3)->startOfMonth();
        $toDate = $this->option('to') ? Carbon::parse($this->option('to')) : Carbon::now()->endOfMonth();
        $vehicleId = $this->option('vehicle');
        $rebuild = $this->option('rebuild') ?? false;
        
        $this->info("Building vehicle cost analytics from {$fromDate->format('Y-m-d')} to {$toDate->format('Y-m-d')}");
        
        if ($rebuild) {
            $this->spatialDataBuilder->clearData($fromDate, $toDate, $vehicleId);
            $this->info("Cleared existing data for the specified period");
        }
        
        // Step 1: Get all vehicles for the period
        $vehicles = $this->vehicleService->getVehicles($vehicleId);
        $this->info("Processing data for " . count($vehicles) . " vehicles");
        
        $bar = $this->output->createProgressBar(count($vehicles));
        $bar->start();
        
        foreach ($vehicles as $vehicle) {
            // Step 2: Get vehicle details and enrich with brand, model, etc.
            $vehicleDetails = $this->vehicleService->getVehicleDetails($vehicle->id);
            
            // Step 3: Get all drivers assigned to this vehicle in the period
            $drivers = $this->driverService->getDriversForVehicle($vehicle->id, $fromDate, $toDate);
            
            // Step 4: Process each month in the date range
            $currentDate = clone $fromDate;
            while ($currentDate <= $toDate) {
                $year = $currentDate->year;
                $month = $currentDate->month;
                $monthStart = Carbon::create($year, $month, 1)->startOfMonth();
                $monthEnd = Carbon::create($year, $month, 1)->endOfMonth();
                
                // Step 5: Get maintenance data for this vehicle and month
                $maintenances = $this->maintenanceService->getMaintenances($vehicle->id, $monthStart, $monthEnd);
                $maintenanceMetrics = $this->calculateMaintenanceMetrics($maintenances);
                
                // Step 6: Get repair data for this vehicle and month
                $repairs = $this->repairService->getRepairs($vehicle->id, $monthStart, $monthEnd);
                $repairMetrics = $this->calculateRepairMetrics($repairs);
                
                // Step 7: Get fuel data for this vehicle and month
                $fuelEntries = $this->fuelService->getFuelEntries($vehicle->id, $monthStart, $monthEnd);
                $fuelMetrics = $this->calculateFuelMetrics($fuelEntries);
                
                // Step 8: Calculate total costs and derived metrics
                $totalCost = $maintenanceMetrics['maintenance_cost'] + $repairMetrics['repair_cost'] + $fuelMetrics['fuel_cost'];
                $costPerKilometer = $fuelMetrics['kilometers_driven'] > 0 
                    ? $totalCost / $fuelMetrics['kilometers_driven'] 
                    : null;
                
                // Step 9: For each driver, create a spatial record
                foreach ($drivers as $driver) {
                    $driverDetails = $this->driverService->getDriverDetails($driver->id);
                    
                    // Calculate driver-specific metrics
                    $driverFuelEntries = array_filter($fuelEntries, function($entry) use ($driver) {
                        return $entry->driver_id === $driver->id;
                    });
                    $driverFuelMetrics = $this->calculateFuelMetrics($driverFuelEntries);
                    
                    // Build the spatial record
                    $this->spatialDataBuilder->createOrUpdateRecord([
                        'date' => $monthStart->format('Y-m-d'),
                        'year' => $year,
                        'month' => $month,
                        'quarter' => ceil($month / 3),
                        
                        'vehicle_id' => $vehicle->id,
                        'vehicle_plate' => $vehicleDetails->plate,
                        'vehicle_model' => $vehicleDetails->model,
                        'vehicle_brand' => $vehicleDetails->brand,
                        'vehicle_type' => $vehicleDetails->type,
                        'vehicle_purchase_date' => $vehicleDetails->purchase_date,
                        'vehicle_age_years' => $vehicleDetails->purchase_date 
                            ? $monthStart->diffInYears(Carbon::parse($vehicleDetails->purchase_date)) 
                            : null,
                        
                        'driver_id' => $driver->id,
                        'driver_name' => $driverDetails->name,
                        'driver_department' => $driverDetails->department,
                        
                        'location_id' => $vehicle->location_id,
                        'location_name' => $vehicleDetails->location_name,
                        'location_city' => $vehicleDetails->location_city,
                        'location_country' => $vehicleDetails->location_country,
                        
                        'maintenance_count' => $maintenanceMetrics['maintenance_count'],
                        'maintenance_cost' => $maintenanceMetrics['maintenance_cost'],
                        'scheduled_maintenance_count' => $maintenanceMetrics['scheduled_maintenance_count'],
                        'unscheduled_maintenance_count' => $maintenanceMetrics['unscheduled_maintenance_count'],
                        
                        'repair_count' => $repairMetrics['repair_count'],
                        'repair_cost' => $repairMetrics['repair_cost'],
                        'mechanical_repair_count' => $repairMetrics['mechanical_repair_count'],
                        'electrical_repair_count' => $repairMetrics['electrical_repair_count'],
                        'body_repair_count' => $repairMetrics['body_repair_count'],
                        
                        'fuel_liters' => $driverFuelMetrics['fuel_liters'],
                        'fuel_cost' => $driverFuelMetrics['fuel_cost'],
                        'kilometers_driven' => $driverFuelMetrics['kilometers_driven'],
                        'fuel_efficiency' => $driverFuelMetrics['fuel_efficiency'],
                        
                        'total_cost' => $driverFuelMetrics['fuel_cost'] + 
                            ($maintenanceMetrics['maintenance_cost'] / count($drivers)) + 
                            ($repairMetrics['repair_cost'] / count($drivers)),
                        'cost_per_kilometer' => $driverFuelMetrics['kilometers_driven'] > 0 
                            ? ($driverFuelMetrics['fuel_cost'] + 
                               ($maintenanceMetrics['maintenance_cost'] / count($drivers)) + 
                               ($repairMetrics['repair_cost'] / count($drivers))) / $driverFuelMetrics['kilometers_driven'] 
                            : null,
                    ]);
                }
                
                // If no drivers, create a record without driver data
                if (empty($drivers)) {
                    $this->spatialDataBuilder->createOrUpdateRecord([
                        'date' => $monthStart->format('Y-m-d'),
                        'year' => $year,
                        'month' => $month,
                        'quarter' => ceil($month / 3),
                        
                        'vehicle_id' => $vehicle->id,
                        'vehicle_plate' => $vehicleDetails->plate,
                        'vehicle_model' => $vehicleDetails->model,
                        'vehicle_brand' => $vehicleDetails->brand,
                        'vehicle_type' => $vehicleDetails->type,
                        'vehicle_purchase_date' => $vehicleDetails->purchase_date,
                        'vehicle_age_years' => $vehicleDetails->purchase_date 
                            ? $monthStart->diffInYears(Carbon::parse($vehicleDetails->purchase_date)) 
                            : null,
                        
                        'driver_id' => null,
                        'driver_name' => null,
                        'driver_department' => null,
                        
                        'location_id' => $vehicle->location_id,
                        'location_name' => $vehicleDetails->location_name,
                        'location_city' => $vehicleDetails->location_city,
                        'location_country' => $vehicleDetails->location_country,
                        
                        'maintenance_count' => $maintenanceMetrics['maintenance_count'],
                        'maintenance_cost' => $maintenanceMetrics['maintenance_cost'],
                        'scheduled_maintenance_count' => $maintenanceMetrics['scheduled_maintenance_count'],
                        'unscheduled_maintenance_count' => $maintenanceMetrics['unscheduled_maintenance_count'],
                        
                        'repair_count' => $repairMetrics['repair_count'],
                        'repair_cost' => $repairMetrics['repair_cost'],
                        'mechanical_repair_count' => $repairMetrics['mechanical_repair_count'],
                        'electrical_repair_count' => $repairMetrics['electrical_repair_count'],
                        'body_repair_count' => $bodyRepairMetrics['body_repair_count'],
                        
                        'fuel_liters' => $fuelMetrics['fuel_liters'],
                        'fuel_cost' => $fuelMetrics['fuel_cost'],
                        'kilometers_driven' => $fuelMetrics['kilometers_driven'],
                        'fuel_efficiency' => $fuelMetrics['fuel_efficiency'],
                        
                        'total_cost' => $totalCost,
                        'cost_per_kilometer' => $costPerKilometer,
                    ]);
                }
                
                // Move to next month
                $currentDate->addMonth();
            }
            
            $bar->advance();
        }
        
        $bar->finish();
        $this->newLine();
        $this->info("Vehicle cost analytics data built successfully");
        
        return 0;
    }
    
    private function calculateMaintenanceMetrics(array $maintenances): array
    {
        $count = count($maintenances);
        $cost = array_sum(array_column($maintenances, 'cost'));
        $scheduledCount = count(array_filter($maintenances, function($m) {
            return $m->type === 'scheduled';
        }));
        $unscheduledCount = $count - $scheduledCount;
        
        return [
            'maintenance_count' => $count,
            'maintenance_cost' => $cost,
            'scheduled_maintenance_count' => $scheduledCount,
            'unscheduled_maintenance_count' => $unscheduledCount,
        ];
    }
    
    private function calculateRepairMetrics(array $repairs): array
    {
        $count = count($repairs);
        $cost = array_sum(array_column($repairs, 'cost'));
        
        $mechanicalCount = count(array_filter($repairs, function($r) {
            return $r->category === 'mechanical';
        }));
        
        $electricalCount = count(array_filter($repairs, function($r) {
            return $r->category === 'electrical';
        }));
        
        $bodyCount = count(array_filter($repairs, function($r) {
            return $r->category === 'body';
        }));
        
        return [
            'repair_count' => $count,
            'repair_cost' => $cost,
            'mechanical_repair_count' => $mechanicalCount,
            'electrical_repair_count' => $electricalCount,
            'body_repair_count' => $bodyCount,
        ];
    }
    
    private function calculateFuelMetrics(array $fuelEntries): array
    {
        $liters = array_sum(array_column($fuelEntries, 'liters'));
        $cost = array_sum(array_column($fuelEntries, 'cost'));
        $kilometers = 0;
        
        // Calculate kilometers driven based on odometer readings
        if (count($fuelEntries) >= 2) {
            usort($fuelEntries, function($a, $b) {
                return strtotime($a->date) - strtotime($b->date);
            });
            
            $firstReading = $fuelEntries[0]->odometer;
            $lastReading = end($fuelEntries)->odometer;
            $kilometers = $lastReading - $firstReading;
        }
        
        $efficiency = $kilometers > 0 && $liters > 0 ? $kilometers / $liters : null;
        
        return [
            'fuel_liters' => $liters,
            'fuel_cost' => $cost,
            'kilometers_driven' => $kilometers,
            'fuel_efficiency' => $efficiency,
        ];
    }
}
\`\`\`

### 3. Spatial Data Builder Service

Created a service to handle the creation and updating of spatial records:

\`\`\`php
<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\DB;
use Carbon\\Carbon;
use Ramsey\\Uuid\\Uuid;

class SpatialDataBuilder
{
    public function createOrUpdateRecord(array $data): void
    {
        // Generate a unique ID based on the key fields
        $uniqueKey = md5(
            $data['vehicle_id'] . 
            $data['date'] . 
            ($data['driver_id'] ?? 'no-driver')
        );
        
        $id = Uuid::uuid5(Uuid::NAMESPACE_DNS, $uniqueKey)->toString();
        
        // Add timestamps
        $data['created_at'] = Carbon::now();
        $data['updated_at'] = Carbon::now();
        
        // Insert or update  = Carbon::now();
        $data['updated_at'] = Carbon::now();
        
        // Insert or update
        DB::table('vehicle_cost_analytics')->updateOrInsert(
            ['id' => $id],
            $data
        );
    }
    
    public function clearData(Carbon $fromDate, Carbon $toDate, ?string $vehicleId = null): void
    {
        $query = DB::table('vehicle_cost_analytics')
            ->whereBetween('date', [$fromDate->format('Y-m-d'), $toDate->format('Y-m-d')]);
            
        if ($vehicleId) {
            $query->where('vehicle_id', $vehicleId);
        }
        
        $query->delete();
    }
}
\`\`\`

### 4. Data Service Implementations

Each data service was responsible for fetching data from its respective domain:

\`\`\`php
<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;
use Carbon\\Carbon;
use Illuminate\\Support\\Facades\\Cache;

class MaintenanceDataService
{
    private $apiUrl;
    private $apiKey;
    
    public function __construct()
    {
        $this->apiUrl = config('services.maintenance.api_url');
        $this->apiKey = config('services.maintenance.api_key');
    }
    
    public function getMaintenances(string $vehicleId, Carbon $fromDate, Carbon $toDate): array
    {
        $cacheKey = "maintenances:{$vehicleId}:{$fromDate->format('Ymd')}:{$toDate->format('Ymd')}";
        
        return Cache::remember($cacheKey, 3600, function () use ($vehicleId, $fromDate, $toDate) {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Accept' => 'application/json',
            ])->get("{$this->apiUrl}/vehicles/{$vehicleId}/maintenances", [
                'from_date' => $fromDate->format('Y-m-d'),
                'to_date' => $toDate->format('Y-m-d'),
            ]);
            
            if ($response->failed()) {
                return [];
            }
            
            return $response->json('data', []);
        });
    }
}
\`\`\`

Similar services were implemented for RepairDataService, FuelDataService, VehicleDataService, and DriverDataService.

### 5. Analytics Repository

Finally, created a repository to query the spatial data:

\`\`\`php
<?php

namespace App\\Repositories;

use Illuminate\\Support\\Facades\\DB;
use Carbon\\Carbon;

class VehicleCostAnalyticsRepository
{
    public function getTotalCostsByVehicleType(int $year, int $quarter = null)
    {
        $query = DB::table('vehicle_cost_analytics')
            ->where('year', $year);
            
        if ($quarter) {
            $query->where('quarter', $quarter);
        }
        
        return $query->select('vehicle_type', DB::raw('SUM(total_cost) as total_cost'))
            ->groupBy('vehicle_type')
            ->orderByDesc('total_cost')
            ->get();
    }
    
    public function getMaintenanceVsRepairCosts(int $year, string $vehicleBrand = null)
    {
        $query = DB::table('vehicle_cost_analytics')
            ->where('year', $year);
            
        if ($vehicleBrand) {
            $query->where('vehicle_brand', $vehicleBrand);
        }
        
        return $query->select(
                'month',
                DB::raw('SUM(maintenance_cost) as maintenance_cost'),
                DB::raw('SUM(repair_cost) as repair_cost')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();
    }
    
    public function getVehicleEfficiencyRanking(int $year, int $month = null)
    {
        $query = DB::table('vehicle_cost_analytics')
            ->where('year', $year)
            ->whereNotNull('fuel_efficiency');
            
        if ($month) {
            $query->where('month', $month);
        }
        
        return $query->select(
                'vehicle_id',
                'vehicle_plate',
                'vehicle_model',
                'vehicle_brand',
                DB::raw('AVG(fuel_efficiency) as avg_efficiency'),
                DB::raw('SUM(kilometers_driven) as total_kilometers'),
                DB::raw('SUM(fuel_liters) as total_fuel')
            )
            ->groupBy('vehicle_id', 'vehicle_plate', 'vehicle_model', 'vehicle_brand')
            ->having('total_kilometers', '>', 100) // Minimum threshold for meaningful data
            ->orderByDesc('avg_efficiency')
            ->get();
    }
    
    public function getDriverCostComparison(int $year, string $department = null)
    {
        $query = DB::table('vehicle_cost_analytics')
            ->where('year', $year)
            ->whereNotNull('driver_id');
            
        if ($department) {
            $query->where('driver_department', $department);
        }
        
        return $query->select(
                'driver_id',
                'driver_name',
                'driver_department',
                DB::raw('SUM(total_cost) as total_cost'),
                DB::raw('SUM(kilometers_driven) as total_kilometers'),
                DB::raw('AVG(cost_per_kilometer) as avg_cost_per_km')
            )
            ->groupBy('driver_id', 'driver_name', 'driver_department')
            ->having('total_kilometers', '>', 100) // Minimum threshold for meaningful data
            ->orderBy('avg_cost_per_km')
            ->get();
    }
    
    public function getVehicleAgeCostCorrelation(int $year)
    {
        return DB::table('vehicle_cost_analytics')
            ->where('year', $year)
            ->whereNotNull('vehicle_age_years')
            ->select(
                'vehicle_age_years',
                DB::raw('COUNT(DISTINCT vehicle_id) as vehicle_count'),
                DB::raw('AVG(maintenance_cost) as avg_maintenance_cost'),
                DB::raw('AVG(repair_cost) as avg_repair_cost'),
                DB::raw('AVG(total_cost) as avg_total_cost')
            )
            ->groupBy('vehicle_age_years')
            ->orderBy('vehicle_age_years')
            ->get();
    }
}
\`\`\`

## Results and Benefits

This approach delivered significant improvements:

1. **Query Performance**: Report generation time decreased from 1-3 seconds to under 300ms
2. **Reduced Coupling**: The analytics service could operate independently of other services
3. **Scalability**: The analytics service could scale based on reporting needs without affecting operational services
4. **Resilience**: Reports remained available even when source services were down
5. **Flexibility**: New report types could be added without modifying source services

## Conclusion

By building spatial data tables that denormalize and pre-aggregate data from multiple services, I created a high-performance analytics system for GVEO's fleet management. This approach eliminated the need for complex joins and cross-service queries, resulting in dramatically faster reports and dashboards.

The spatial data approach has proven so successful that I've applied it to other analytics domains in the organization, creating a more resilient and performant system overall.
    `,
  },
  {
    id: 3,
    title: 'Enhancing Laravel Event Systems with the Strategy Pattern',
    date: 'March 10, 2025',
    summary: 'How to use the Strategy Pattern to create more flexible and maintainable event handling, subscribers, and notifications in Laravel applications.',
    tags: ['Laravel', 'Design Patterns', 'Architecture', 'Best Practices'],
    image: '/strategy-pattern.jpg',
    category: 'Design Patterns',
    canonicalUrl: 'https://josephnomo.pro/portfolio/laravel-strategy-pattern',
    author: {
      name: 'Joseph Nomo',
      url: 'https://josephnomo.pro',
      twitter: '@CodeHacker237'
    },
    readTime: '10 min read',
    lastUpdated: '2025-03-20',
    content: `
# Enhancing Laravel Event Systems with the Strategy Pattern

Laravel provides powerful event systems, subscribers, and notifications out of the box. However, as applications grow in complexity, these systems can become difficult to maintain and extend. The Strategy Pattern offers an elegant solution to these challenges.

## The Problem

Recently for my project GVEO, I encountered several issues with our event handling:

1. **Conditional Logic Bloat**: Event listeners contained complex conditional logic to handle different scenarios
2. **Tight Coupling**: Event handlers were tightly coupled to specific notification channels
3. **Testing Difficulty**: Complex event handlers were difficult to test in isolation
4. **Code Duplication**: Similar notification logic was duplicated across different events
5. **Limited Flexibility**: Adding new notification strategies required modifying existing code

## The Strategy Pattern Solution

The Strategy Pattern allows you to define a family of algorithms, encapsulate each one, and make them interchangeable. This pattern is perfect for event handling and notifications.

### 1. Defining Strategy Interfaces

First, defined clear interfaces for our strategies:

\`\`\`php
<?php

namespace App\\Contracts;

use App\\Models\\User;
use App\\Models\\Notification;

interface NotificationStrategyInterface
{
    public function shouldSend(User $user, array $data): bool;
    public function send(User $user, Notification $notification): bool;
}
\`\`\`

\`\`\`php
<?php

namespace App\\Contracts;

use App\\Events\\BaseEvent;

interface EventHandlerStrategyInterface
{
    public function canHandle(BaseEvent $event): bool;
    public function handle(BaseEvent $event): void;
}
\`\`\`

### 2. Implementing Concrete Strategies

Next, created concrete implementations for each strategy:

\`\`\`php
<?php

namespace App\\Notifications\\Strategies;

use App\\Contracts\\NotificationStrategyInterface;
use App\\Models\\User;
use App\\Models\\Notification;
use Illuminate\\Support\\Facades\\Mail;
use App\\Mail\\GenericNotification;

class EmailNotificationStrategy implements NotificationStrategyInterface
{
    public function shouldSend(User $user, array $data): bool
    {
        // Check if user has email notifications enabled
        return $user->notification_preferences->email_enabled 
            && !empty($user->email)
            && (!isset($data['importance']) || $data['importance'] >= $user->notification_preferences->email_importance_threshold);
    }
    
    public function send(User $user, Notification $notification): bool
    {
        try {
            Mail::to($user->email)
                ->send(new GenericNotification($notification));
                
            return true;
        } catch (\\Exception $e) {
            report($e);
            return false;
        }
    }
}
\`\`\`

\`\`\`php
<?php

namespace App\\Notifications\\Strategies;

use App\\Contracts\\NotificationStrategyInterface;
use App\\Models\\User;
use App\\Models\\Notification;
use Illuminate\\Support\\Facades\\Http;

class SmsNotificationStrategy implements NotificationStrategyInterface
{
    private $smsApiKey;
    private $smsApiUrl;
    
    public function __construct()
    {
        $this->smsApiKey = config('services.sms.api_key');
        $this->smsApiUrl = config('services.sms.api_url');
    }
    
    public function shouldSend(User $user, array $data): bool
    {
        // Check if user has SMS notifications enabled and has a phone number
        return $user->notification_preferences->sms_enabled 
            && !empty($user->phone)
            && (!isset($data['importance']) || $data['importance'] >= $user->notification_preferences->sms_importance_threshold);
    }
    
    public function send(User $user, Notification $notification): bool
    {
        try {
            // Format the message for SMS (shorter version)
            $message = substr($notification->title . ': ' . $notification->message, 0, 160);
            
            // Send SMS via API
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->smsApiKey
            ])->post($this->smsApiUrl, [
                'to' => $user->phone,
                'message' => $message
            ]);
            
            return $response->successful();
        } catch (\\Exception $e) {
            report($e);
            return false;
        }
    }
}
\`\`\`

\`\`\`php
<?php

namespace App\\Notifications\\Strategies;

use App\\Contracts\\NotificationStrategyInterface;
use App\\Models\\User;
use App\\Models\\Notification;
use Illuminate\\Support\\Facades\\Http;

class PushNotificationStrategy implements NotificationStrategyInterface
{
    private $fcmApiKey;
    private $fcmApiUrl;
    
    public function __construct()
    {
        $this->fcmApiKey = config('services.fcm.api_key');
        $this->fcmApiUrl = config('services.fcm.api_url');
    }
    
    public function shouldSend(User $user, array $data): bool
    {
        // Check if user has push notifications enabled and has device tokens
        return $user->notification_preferences->push_enabled 
            && $user->devices->isNotEmpty()
            && (!isset($data['importance']) || $data['importance'] >= $user->notification_preferences->push_importance_threshold);
    }
    
    public function send(User $user, Notification $notification): bool
    {
        try {
            $deviceTokens = $user->devices->pluck('push_token')->toArray();
            
            if (empty($deviceTokens)) {
                return false;
            }
            
            // Send push notification via Firebase Cloud Messaging
            $response = Http::withHeaders([
                'Authorization' => 'key=' . $this->fcmApiKey,
                'Content-Type' => 'application/json'
            ])->post($this->fcmApiUrl, [
                'registration_ids' => $deviceTokens,
                'notification' => [
                    'title' => $notification->title,
                    'body' => $notification->message,
                ],
                'data' => [
                    'notification_id' => $notification->id,
                    'type' => $notification->type
                ]
            ]);
            
            return $response->successful();
        } catch (\\Exception $e) {
            report($e);
            return false;
        }
    }
}
\`\`\`

### 3. Creating a Strategy Context

Then, created a context class to manage the strategies:

\`\`\`php
<?php

namespace App\\Services;

use App\\Contracts\\NotificationStrategyInterface;
use App\\Models\\User;
use App\\Models\\Notification;
use Illuminate\\Support\\Collection;

class NotificationService
{
    private $strategies;
    
    public function __construct(Collection $strategies)
    {
        $this->strategies = $strategies;
    }
    
    public function sendNotification(User $user, Notification $notification): array
    {
        $results = [];
        $data = $notification->data;
        
        foreach ($this->strategies as $strategyName => $strategy) {
            if ($strategy->shouldSend($user, $data)) {
                $success = $strategy->send($user, $notification);
                $results[$strategyName] = $success;
            } else {
                $results[$strategyName] = null; // Indicates not attempted
            }
        }
        
        return $results;
    }
}
\`\`\`

### 4. Registering Strategies with Laravel's Service Container

Registered the strategies in a service provider:

\`\`\`php
<?php

namespace App\\Providers;

use Illuminate\\Support\\ServiceProvider;
use Illuminate\\Support\\Collection;
use App\\Contracts\\NotificationStrategyInterface;
use App\\Notifications\\Strategies\\EmailNotificationStrategy;
use App\\Notifications\\Strategies\\SmsNotificationStrategy;
use App\\Notifications\\Strategies\\PushNotificationStrategy;
use App\\Services\\NotificationService;

class NotificationServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(NotificationService::class, function ($app) {
            $strategies = new Collection([
                'email' => $app->make(EmailNotificationStrategy::class),
                'sms' => $app->make(SmsNotificationStrategy::class),
                'push' => $app->make(PushNotificationStrategy::class),
            ]);
            
            return new NotificationService($strategies);
        });
    }
}
\`\`\`

### 5. Implementing Event Handlers with Strategy Pattern

Similarly, applied the Strategy Pattern to event handlers:

\`\`\`php
<?php

namespace App\\Listeners;

use App\\Events\\BaseEvent;
use App\\Contracts\\EventHandlerStrategyInterface;
use Illuminate\\Support\\Collection;

class StrategicEventListener
{
    private $strategies;
    
    public function __construct(Collection $strategies)
    {
        $this->strategies = $strategies;
    }
    
    public function handle(BaseEvent $event): void
    {
        foreach ($this->strategies as $strategy) {
            if ($strategy->canHandle($event)) {
                $strategy->handle($event);
            }
        }
    }
}
\`\`\`

\`\`\`php
<?php

namespace App\\Providers;

use Illuminate\\Foundation\\Support\\Providers\\EventServiceProvider as ServiceProvider;
use Illuminate\\Support\\Collection;
use App\\Listeners\\StrategicEventListener;
use App\\Events\\UserRegistered;
use App\\Events\\PaymentProcessed;
use App\\Events\\MaintenanceScheduled;
use App\\EventHandlers\\UserRegistrationHandler;
use App\\EventHandlers\\PaymentProcessedHandler;
use App\\EventHandlers\\MaintenanceNotificationHandler;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        UserRegistered::class => [
            StrategicEventListener::class,
        ],
        PaymentProcessed::class => [
            StrategicEventListener::class,
        ],
        MaintenanceScheduled::class => [
            StrategicEventListener::class,
        ],
    ];
    
    public function register()
    {
        $this->app->when(StrategicEventListener::class)
            ->needs(Collection::class)
            ->give(function ($app) {
                return new Collection([
                    $app->make(UserRegistrationHandler::class),
                    $app->make(PaymentProcessedHandler::class),
                    $app->make(MaintenanceNotificationHandler::class),
                ]);
            });
    }
}
\`\`\`

### 6. Example Event Handler Strategy

Here's an example of a concrete event handler strategy:

\`\`\`php
<?php

namespace App\\EventHandlers;

use App\\Contracts\\EventHandlerStrategyInterface;
use App\\Events\\BaseEvent;
use App\\Events\\UserRegistered;
use App\\Services\\NotificationService;
use App\\Models\\Notification;

class UserRegistrationHandler implements EventHandlerStrategyInterface
{
    private $notificationService;
    
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }
    
    public function canHandle(BaseEvent $event): bool
    {
        return $event instanceof UserRegistered;
    }
    
    public function handle(BaseEvent $event): void
    {
        if (!$this->canHandle($event)) {
            return;
        }
        
        /** @var UserRegistered $event */
        $user = $event->user;
        
        // Create welcome notification
        $notification = new Notification([
            'user_id' => $user->id,
            'title' => 'Welcome to GVEO!',
            'message' => 'Thank you for registering. Get started by completing your profile.',
            'type' => 'welcome',
            'data' => [
                'importance' => 'high',
                'action_url' => route('profile.edit'),
                'action_text' => 'Complete Profile'
            ]
        ]);
        
        $notification->save();
        
        // Send notification using all appropriate strategies
        $this->notificationService->sendNotification($user, $notification);
        
        // Additional registration handling logic...
    }
}
\`\`\`

## Benefits Realized

Implementing the Strategy Pattern delivered several key benefits:

1. **Cleaner Code**: Event handlers and notification logic became more focused and easier to understand
2. **Improved Testability**: Each strategy could be tested in isolation
3. **Enhanced Flexibility**: New notification channels could be added without modifying existing code
4. **Better Separation of Concerns**: Each strategy handled one specific notification channel
5. **Simplified Maintenance**: Bug fixes and feature enhancements could be made to individual strategies

## Real-World Example: Vehicle Maintenance Notifications

One of the most impactful applications of this pattern was in our vehicle maintenance notification system:

\`\`\`php
<?php

namespace App\\EventHandlers;

use App\\Contracts\\EventHandlerStrategyInterface;
use App\\Events\\BaseEvent;
use App\\Events\\MaintenanceScheduled;
use App\\Services\\NotificationService;
use App\\Models\\Notification;
use App\\Services\\CalendarService;

class MaintenanceNotificationHandler implements EventHandlerStrategyInterface
{
    private $notificationService;
    private $calendarService;
    
    public function __construct(
        NotificationService $notificationService,
        CalendarService $calendarService
    ) {
        $this->notificationService = $notificationService;
        $this->calendarService = $calendarService;
    }
    
    public function canHandle(BaseEvent $event): bool
    {
        return $event instanceof MaintenanceScheduled;
    }
    
    public function handle(BaseEvent $event): void
    {
        if (!$this->canHandle($event)) {
            return;
        }
        
        /** @var MaintenanceScheduled $event */
        $maintenance = $event->maintenance;
        $vehicle = $event->vehicle;
        $user = $vehicle->owner;
        
        // Create calendar event
        $calendarEvent = $this->calendarService->createEvent(
            $user,
            'Vehicle Maintenance: ' . $vehicle->name,
            $maintenance->description,
            $maintenance->scheduled_at,
            $maintenance->estimated_duration
        );
        
        // Create notification
        $notification = new Notification([
            'user_id' => $user->id,
            'title' => 'Maintenance Scheduled: ' . $vehicle->name,
            'message' => "Your vehicle maintenance has been scheduled for " . 
                         $maintenance->scheduled_at->format('F j, Y, g:i a'),
            'type' => 'maintenance_scheduled',
            'data' => [
                'importance' => 'medium',
                'maintenance_id' => $maintenance->id,
                'vehicle_id' => $vehicle->id,
                'calendar_event_id' => $calendarEvent->id,
                'action_url' => route('maintenance.show', $maintenance->id),
                'action_text' => 'View Details'
            ]
        ]);
        
        $notification->save();
        
        // Send notification using all appropriate strategies
        $this->notificationService->sendNotification($user, $notification);
    }
}
\`\`\`

## Conclusion

The Strategy Pattern has transformed how I handle events and notifications in our Laravel applications. By encapsulating different notification strategies and event handlers, I've created a more maintainable, testable, and flexible system.

This approach has been particularly valuable as our application has grown, allowing us to add new notification channels and event types without increasing complexity or introducing bugs in existing functionality.

For any Laravel application dealing with complex event handling or multiple notification channels, the Strategy Pattern offers a powerful way to organize code and improve maintainability.
    `,
  }
]);

onMounted(() => {
  document.title = 'Portfolio - My Awesome Site';
});
</script>

<style scoped>
.portfolio {
  padding: 2rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-family: 'Fira Code', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: inline-block;
}

.title-prefix {
  color: var(--accent-primary);
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>

