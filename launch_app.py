import frida

package_name = "com.twitter.android"

device = frida.get_usb_device()
pid = device.spawn([package_name])
device.resume(pid)
