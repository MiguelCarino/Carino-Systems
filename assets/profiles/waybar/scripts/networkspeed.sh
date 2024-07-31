#!/bin/bash

# Function to get network speed
get_network_speed() {
    # Get the network interface name (you may need to adjust this based on your setup)
    interface=$(ip route get 8.8.8.8 | grep -o "dev [^[:space:]]*" | awk '{print $2}')

    # Get the received bytes and transmitted bytes for the interface
    rx_bytes=$(cat "/sys/class/net/$interface/statistics/rx_bytes")
    tx_bytes=$(cat "/sys/class/net/$interface/statistics/tx_bytes")

    # Sleep for 1 second to calculate the speed
    sleep 1

    # Get the new received bytes and transmitted bytes
    rx_bytes_new=$(cat "/sys/class/net/$interface/statistics/rx_bytes")
    tx_bytes_new=$(cat "/sys/class/net/$interface/statistics/tx_bytes")

    # Calculate the speed in bytes per second
    rx_speed=$((rx_bytes_new - rx_bytes))
    tx_speed=$((tx_bytes_new - tx_bytes))

    # Convert bytes to kilobytes
    rx_speed_kb=$(echo "scale=2; $rx_speed / (1024 * 1024)" | bc)
    tx_speed_kb=$(echo "scale=2; $tx_speed / (1024 * 1024)" | bc)

    echo "↑$tx_speed_kb MB/s ↓$rx_speed_kb MB/s"
}

# Output the network speed
echo "$(get_network_speed)"

