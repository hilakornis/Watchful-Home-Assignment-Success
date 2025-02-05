import time
import sys
import frida

feature_set  = set()
setting_to_enable = ""
def on_message(message, data):
    if message['type'] == 'send':
        # print(f"[{message['type']}] {message['payload']}")

        msg = f"{message['payload']}"
        feature_set.add(msg)

        ls = list(feature_set)
        ls.sort()
        
        changed = True
        changed = not (msg in ls)
        
        if( changed):
            print("\n==================================\n")
           
            for f in ls:
                print(len(ls))
                print(f + "\n")
            print("==================================\n")
         
    elif message['type'] == 'error':
        print(f"[{message['type']}] {message['stack']}")


device = frida.get_usb_device()
pid = device.spawn(["com.twitter.android"])
device.resume(pid)
time.sleep(1)  # Without it Java.perform silently fails
session = device.attach(pid)
with open("preff_features.js") as f:
    script = session.create_script(f.read())
script.on("message", on_message)
script.load()
# script.exports_sync.callSecretFunction(setting_to_enable)
# sys.stdin.read()

# command = ""
# while 1 == 1:
#     command = input("Enter command:\n1: Exit\n2: Call secret function\nchoice:")
#     if command == "1":
#         break
#     elif command == "2":
        
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python frida_turn_on_feature.py <setting_to_enable>")
        # in the terminal :  python3 .\frida_turn_on_feature.py voting
        sys.exit(1)

    
    setting_to_enable = sys.argv[1] # example : votting
    # script.exports.callSecretFunction(setting_to_enable)


    # i = 3
    # while i > 0:        
    #     script.exports.callSecretFunction(setting_to_enable)
    #     time.sleep(2)  # Without it Java.perform silently fails
    #     command = input("Enter command:\n1: Exit\n2: Call secret function\nchoice:")
    #     # if command == "1":
    #     #     break
    #     # elif command == "2":
    #         # script.exports_sync.callSecretFunction(setting_to_enable)
    #     script.exports.callSecretFunction(setting_to_enable)

    command = ""
    i = 3
    while i > 0:        
        command = input("Enter command:\n1: Exit\n2: Call secret function\nchoice:")
        if command == "1":
            break
        elif command == "2":
            # script.exports_sync.callSecretFunction(setting_to_enable)
            script.exports.callSecretFunction(setting_to_enable)

    

