import frida
import sys

def on_message(message, data):
    if message['type'] == 'send':
        print(f"[{message['type']}] {message['payload']}")
    elif message['type'] == 'error':
        print(f"[{message['type']}] {message['stack']}")

def on_terminated():
    print("The JavaScript script has been terminated.")
    sys.exit(0)

def run_frida_script(package_name, script_path):
    # Load the JavaScript code from the file
    with open(script_path, 'r') as file:
        js_code = file.read()

    # Connect to the device and spawn the target app
    device = frida.get_usb_device()
    pid = device.spawn([package_name])
    session = device.attach(pid)

    # Create a script object and load the JavaScript code
    script = session.create_script(js_code)
    script.on('message', on_message)
    script.on('destroyed', on_terminated)
    script.load()

    # Resume the app
    device.resume(pid)
    
    # Keep the script running
    sys.stdin.read()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python run_frida_script.py <package_name> <script_path>")
        sys.exit(1)

    package_name = sys.argv[1]
    script_path = sys.argv[2]
    run_frida_script(package_name, script_path)
