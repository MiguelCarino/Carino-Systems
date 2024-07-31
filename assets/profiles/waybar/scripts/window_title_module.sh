#!/bin/bash

# Function to get active window title
get_active_window_title() {
    active_window_id=$(xdotool getactivewindow)
    if [ $? -eq 0 ]; then
        window_title=$(xdotool getwindowname "$active_window_id")
        echo "$window_title"
    else
        echo "No active window"
    fi
}

# Infinite loop to update Waybar module
while true; do
    active_window_title=$(get_active_window_title)
    #echo "{\"text\": \"$active_window_title\", \"tooltip\": \"$active_window_title\"}"
    echo "$active_window_title"
    sleep 1  # Adjust the update frequency as needed
done
