#!/bin/bash

# Variable to store the previous active window ID
prev_window_id=""

# Function to get active window title
get_active_window_title() {
    active_window_id=$(xdotool getactivewindow)
    if [ "$active_window_id" != "$prev_window_id" ]; then
        window_title=$(xdotool getwindowname "$active_window_id")
        prev_window_id="$active_window_id"
        echo "$window_title"
    fi
}

# Infinite loop to update Waybar module
while true; do
    active_window_title=$(get_active_window_title)
    if [ -n "$active_window_title" ]; then
        echo "{\"text\": \"$active_window_title\", \"tooltip\": \"$active_window_title\"}"
    else
        echo "{\"text\": \"No active window\", \"tooltip\": \"No active window\"}"
    fi
    sleep 1  # Adjust the update frequency as needed
done
