# Subir drcamilogomez.com a GitHub y Vercel

## 1. Abre Terminal en Mac

## 2. Ve a Descargas
```bash
cd ~/Downloads
```

## 3. Entra a la carpeta descomprimida
```bash
cd drcamilogomez-github-ready
```

## 4. Inicializa git
```bash
git init
```

## 5. Conecta tu repositorio
```bash
git remote add origin https://github.com/drcamilogomez/drcamilogomez-web.git
```

## 6. Agrega los archivos
```bash
git add .
```

## 7. Crea el primer commit
```bash
git commit -m "Primera versión web Dr Camilo Gómez"
```

## 8. Sube a GitHub
```bash
git branch -M main
git push -u origin main
```

Después de esto, Vercel debería desplegar la web automáticamente.
