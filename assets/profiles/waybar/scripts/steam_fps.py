#!/usr/bin/env python3
import subprocess

def get_fps():
    try:
        # Run mangoHud command to retrieve FPS data
        result = subprocess.run(['mango-hud'], capture_output=True, text=True)
        output_lines = result.stdout.split('\n')
        for line in output_lines:
            if 'FPS' in line:
                fps = line.split(':')[-1].strip()
                return fps
    except Exception as e:
        return f'Error: {e}'
    return 'N/A'

def main():
    fps = get_fps()
    print(fps)

if __name__ == '__main__':
    main()
