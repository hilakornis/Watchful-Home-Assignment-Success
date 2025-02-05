import frida
package_name = "Twitter"
device = frida.get_usb_device()
processes = device.enumerate_processes()
# print('those are the processes : ')
# for p in (processes):
#     print(p)
#     print("\n")

process = [p for p in processes if p.name == package_name]
if process[0] is not None:
    device.kill(process[0].pid)
    print("killed : " + package_name )