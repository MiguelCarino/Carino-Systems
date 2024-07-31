#!/bin/bash

# Function to get active window class
get_active_window_class() {
    active_window_id=$(xdotool getactivewindow)
    active_window_class=$(xprop -id "$active_window_id" WM_CLASS | awk '{print $NF}')
    echo "$active_window_class"
}

# Infinite loop to update Waybar module
while true; do
    active_window_class=$(get_active_window_class)
    if [ -n "$active_window_class" ]; then
        echo "{\"text\": \"$active_window_class\", \"tooltip\": \"$active_window_class\"}"
    else
        echo "{\"text\": \"No active window\", \"tooltip\": \"No active window\"}"
    fi
    sleep 1  # Adjust the update frequency as needed
done
