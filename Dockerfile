# Usando Node.js 20
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Compile o código
RUN npm run build

# Exponha a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
