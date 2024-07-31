#!/bin/bash

# Retrieve memory usage and total memory
mem_info=$(free -h | awk '/Mem/{print $3" "$2}')

# Extract used and total memory values in GB
read used_ram total_ram <<<"$mem_info"

# Convert used and total memory values from GiB to GB
used_ram_gb=$(echo "$used_ram" | sed 's/Gi/ /' | bc)
total_ram_gb=$(echo "$total_ram" | sed 's/Gi/ /' | bc)

# Print used and total memory in the desired format
echo "$used_ram_gb GB" # / $total_ram_gb GB"
