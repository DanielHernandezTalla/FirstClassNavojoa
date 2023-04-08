# Sistema First Class

Sistema First Class es un programa que ayuda a la administración de eventos y a la creación de documentos de pago para cierta empresa. 

![](https://res.cloudinary.com/danielhdz/image/upload/v1651004779/SFC/2022-04-26_13h25_07_fhcuku.png)

##  Instalación 

Sistema First Class es un sistema no instalable, que se ejecuta después de la compilación del propio programa, todo esto con el uso de Electron como framework principal de construcción del proyecto. 

```
    "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
    "package-win": "electron-packager . SistemaFirstClass --overwrite --asar=true --platform=win32 --arch=ia32 --icon=./icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\"",
    "package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"
```

## Requerimientos 

- Memoria RAM mínimo 4GB
- Procesador de 4 núcleos 
- Almacenamiento mínimo de 256GB
- Pantalla resolución mínima de 800X600
