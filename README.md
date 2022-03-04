<p align="center"><img src="https://user-images.githubusercontent.com/74045117/153612009-ee9cd2cb-5ef2-4f96-af02-4c8cb2d0829f.png" width="100%"></p>

# **Description**

This README is a simple documentation of Justy.

<br>

Justy is a To-Do app with authentication. It allows users to increase their productivity by creating, editing, deleting, and marking tasks as done. Tasks are assigned to the appropriate user accounts. As a result, they have accession to their resources from many devices. Furthermore, every task can have an “important” flag, so it will be better visible on the list. When the tasks accumulate, Justy gives a possibility to find an individual of them through the searching mechanism. In a sliding up menu is available a summary, where you find out how many tasks have “To Do” status and how many “Done” status.

<br>

### **Technologies used**

Justy was created using [Electron.js](https://www.electronjs.org/). We used the [electron-builder](https://www.npmjs.com/package/electron-builder) to build the app and the [electron-updater](https://www.npmjs.com/package/electron-updater) for automatic updates. The backend was written in [Node.js](https://nodejs.org/).

<br>

# **Installation**

Below is a step-by-step installation process for different operating systems (and Linux distros). <br>
Justy app installed from files: `.exe`, `.AppImage`, `.dmg` is automatically updated.

<br>

### **Windows**

1. Download the file with the `.exe` extension from the latest [Release](https://github.com/olek-arsee/justy/releases/latest).
2. Run the installer.
3. Installation requires no user interaction or administrator privileges.

<br>

### **Linux**

- `.deb`
  1. Download the file with the `.deb` extension from the latest [Release](https://github.com/olek-arsee/justy/releases/latest).
  2. Install the package using the command:
     ```
     $ sudo dpkg -i ./justy.deb
     ```

<br>

- `.rpm`
  1. Download the file with the `.rpm` extension from the latest [Release](https://github.com/olek-arsee/justy/releases/latest).
  2. Install the package using the command:
     ```
     $ sudo rpm -i ./justy.rpm
     ```

<br>

- `.pacman`
  1. Download the file with the `.pacman` extension from the latest [Release](https://github.com/olek-arsee/justy/releases/latest).
  2. Install the package using the command:
     ```
     $ sudo pacman -U ./justy.pacman
     ```

<br>

- `.AppImage`
  1. Download and install [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) from the latest [Release](https://github.com/TheAssassin/AppImageLauncher/releases/latest).
  2. Download the file with the `.AppImage` extension from the latest [Release](https://github.com/olek-arsee/justy/releases/latest).
  3. Run the file downloaded in the second step and click the `Integrate and run` button.

<br>

### **macOS**

1. Download the file with the `.dmg` extension from the latest [Release](https://github.com/olek-arsee/justy/releases/latest).
2. Run the installer.
3. Move the Justy icon to the Application's folder icon.

<br>

# **Known Issues**

- ### **Windows**

  - The system gives a warning (screenshot below) when attempting to run the installer. This is due to the lack of a certificate.
    <br>
    To overcome this problem, click: `More info` and then `Run anyway`. <br><br>
    ![Microsoft Certificate](https://user-images.githubusercontent.com/74045117/152698798-ce2b632a-bd11-4174-9045-ce6ed8250850.png)

- ### **macOS**
  - When Justy is launched for the first time, the system displays a window (screenshot below) that prevents the app from opening. To fix it, go to: `System Preferences => Security & Privacy => General`. <br><br>
    When opening the program, you'll be presented with the option `Open Anyway`, which you must select to use our project. Then you only need to confirm by clicking the `Open` button. This problem only occurs after installation and is caused by a missing Apple certificate. <br><br>
    ![Apple Certificate](https://user-images.githubusercontent.com/74045117/152699337-b7afc7ab-fcf3-4089-a371-3d53345118b7.jpeg)
