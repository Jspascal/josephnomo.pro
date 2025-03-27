terraform {
  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }
}

variable "droplet_ip" {
  description = "My droplet ip address"
  type        = string
}

variable "ssh_private_key" {
  description = "SSH private key content"
  type        = string
  sensitive   = true
}

variable "ssh_user" {
  description = "SSH user for the droplet"
  type        = string
  sensitive   = true
}

variable "deploy_path" {
  description = "Website deployment path"
  type        = string
  sensitive   = true
}

resource "null_resource" "deploy" {
  triggers = {
    always_run = "${timestamp()}"
  }

  connection {
    type        = "ssh"
    user        = var.ssh_user
    host        = var.droplet_ip
    private_key = var.ssh_private_key
  }

  provisioner "remote-exec" {
    inline = [
      "sudo mkdir -p ${var.deploy_path}",
      "sudo chown -R www-data:www-data ${var.deploy_path}"
    ]
  }
}
