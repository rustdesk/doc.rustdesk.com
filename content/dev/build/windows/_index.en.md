---
title: Windows
weight: 20
---

## Dependencies

### C++ build environment

Download [msvc](https://visualstudio.microsoft.com/) and install.

### Rust develop environment
Download [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) and install.

### vcpkg

Use [git-bash](https://git-scm.com/download/win) to run the following commands， download `vcpkg`, install `libvpx`, `libyuv`, `opus`.

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2021.12.01
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

Add environment variable `VCPKG_ROOT`=`<path>\vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### sciter

Desktop versions use [sciter](https://sciter.com/) for GUI, please download [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

### llvm

rust-bindgen depends on clang,  download [llvm](https://github.com/llvm/llvm-project/releases) and install，add environment variable `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.



## Build

### Default

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
mv sciter.dll target/debug
cargo run
```

### Pack resource files

Rustdesk can pack resource files in one exe file.
Then extract files to the installation directory when being installed.

This design makes rustdesk run both simple mode(single exe file) and full mode(all files after been installed).

To pack resource files, follow the steps:
1. cd rustdesk
2. mkdir `resources` directory
3. put files to `resources`
4. cargo build --features with_rc,<other features>

Feature `with_rc` is introduced to pack and extract resource files.

#### Lib `simple_rc`

A lib named `simple_rc` is used to pack and extract resource files.

##### Generate resource packed file
The pack process workflow:
1. Parse the specified directory tree.
2. Exclude specified files.
3. Read all file contents, save as byte arrays in source file(`rc.rs`), and remember file names.

`simple_rc` accepts either a configuration file or a `Config` structure.

1. Generate resource packed with configuration file.
```
fn generate(conf_file: &str) -> ResultType<()>
```
```
# The output source file
outfile = "src/rc.rs"

# The resource config list.
[[confs]]
# The file or director to integrate.
inc = "D:/projects/windows/RustDeskTempTopMostWindow/x64/Release/xxx"
# The exclusions.
exc = ["*.dll", "*.exe"]
# The front path that will ignore for extracting.
# ${OutputPath} = ${InstallDir} + (${inc} - ${suppressed_front})
# The following config will make base output path to be "RustDeskTempTopMostWindow/x64/Release/xxx".
suppressed_front = "D:/projects/windows"
```

2. Generate resource packed file with a `Config` structure:
```
fn generate_with_conf<'a>(conf: &'a Config) -> ResultType<()>

...
    generate_with_conf(&Config {
        outfile: "src/rc.rs".to_owned(),
        confs: vec![ConfigItem {
            inc: "resources".to_owned(),
            exc: vec![],
            suppressed_front: "resources".to_owned(),
        }],
    })
    .unwrap();
...
```

##### Extract files

Extraction will keep the resource direcotry tree.

The extraction process workflow:
1. Create directory if needed, to restore the directory tree.
2. Write contents to the associated file names.

```
fn extract_resources(root_path: &str) -> ResultType<()>
```

##### Note

File attributes like privileges, create time, owner, are not supported.
