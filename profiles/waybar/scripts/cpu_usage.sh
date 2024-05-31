#!/bin/bash

# Function to determine icon based on temperature
get_icon() {
    local temp=$1
    local icons=("" "" "" "" "" "" "")  # Icons array
    local thresholds=(0 40 50 60 70 80)  # Temperature thresholds
    local icon_index=0
    for ((i=0; i<${#thresholds[@]}; i++)); do
        if ((temp >= thresholds[i])); then
            icon_index=$i
        fi
    done
    echo "${icons[icon_index]}"
}

# Query NVIDIA GPU temperature via nvidia-smi
temperature=$(sensors k10temp-pci-00c3 | grep Tctl | awk '{print $2}' | sed 's/+//')

# Get temperature icon
temperature_icon=$(get_icon $temperature)

# Get CPU usage percentage
usage=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')

# Get used memory
used_mem=$(free -m | awk 'NR==2{printf "%.2f", $3/1024}')

# Output for Waybar: CPU Usage Percentage, GPU Temperature, and RAM Usage
printf "%.0f%%|%s%s|%.2f GB🐏\n" $usage $temperature $temperature_icon $used_mem

