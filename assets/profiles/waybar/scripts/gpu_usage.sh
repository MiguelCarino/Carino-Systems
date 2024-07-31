#!/bin/bash
read total used <<<$(nvidia-smi --query-gpu=memory.total,memory.used --format=csv,noheader,nounits | awk -F', ' '{print $1" "$2}')

# Convert MB to GB for total and used memory
total_gb=$(echo "$total / 1024" | bc -l)
used_gb=$(echo "$used / 1024" | bc -l)

# Query NVIDIA GPU usage (utilization.gpu) via nvidia-smi
usage=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits)
# Get GPU temperature
temperature=$(nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits)

# Output for Waybar: GPU Usage Percentage
printf "%s%%|%s°C|%.2f GB🐏\n" $usage $temperature $used_gb
