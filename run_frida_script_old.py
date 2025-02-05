# import frida

# package_name = "com.twitter.android"

# device = frida.get_usb_device()
# pid = device.spawn([package_name])
# session = device.attach(pid)
# script = session.create_script(open("hook_to_function.js").read())
# script.load()
# device.resume(pid)

# # Prevent the script from terminating
# input()

