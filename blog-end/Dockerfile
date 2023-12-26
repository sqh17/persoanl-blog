
#node.js作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 将依赖项的package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制所有项目文件到工作目录
COPY . .
RUN npm run pm
# 暴露端口
EXPOSE 7001

# 设置环境变量
ENV MONGO_HOST=mongo
ENV MONGO_PORT=27017

# 启动应用
#CMD ["npm" "run" "pm"]
#ENTRYPOINT ["npm", "run"]
#CMD ["dev"]
