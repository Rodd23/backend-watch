# Teste de Programação 
<h1>Este é o guia para configurar e executar o backend do projeto de teste para a vaga de Desenvolvedor. Certifique-se de seguir os passos abaixo para configurar o ambiente e executar a aplicação.
</h1>

<h2>Este projeto é uma aplicação desenvolvida com o NestJS, utilizando o Prisma como ORM (Object-Relational Mapping), e o banco de dados utilizado é o SQLite. A aplicação apresenta um fluxo de autenticação completo, permitindo aos usuários autenticarem-se de forma segura. Além disso, o projeto conta com operações de CRUD (Create, Read, Update, Delete) tanto para usuários quanto para filmes.</h2>

<h2>Tecnologias Utilizadas:</h2>
<p>NestJS: Framework para construção de aplicativos server-side usando Node.js.</p>
<p>Prisma: ORM (Object-Relational Mapping) moderno para comunicação com o banco de dados.</p>
<p>SQLite: Banco de dados relacional leve e eficiente, utilizado para armazenar os dados da aplicação</p>

<h2>Instalação</h2>
 <p>1. Clone o repositório para o seu ambiente local:</p>

<p>2. Navegue até a pasta do projeto:</p>
<p>cd nomedapasta</p>

<h2>Instale as dependências do projeto:</h2>
<p>npm install</p>

<h2>Execução da Aplicação</h2>
<p>1. No terminal, execute o seguinte comando para iniciar a aplicação:</p>
    npm run start:dev
<p>A aplicação estará disponível em http://localhost:3000.</p>

<h2>Oberservações:</h2>
<p>Atualizei o repositório com o arquivo .env, facilitando o preenchimento dos campos JWT_SECRET e DATABASE_URL, configurações essenciais para o correto funcionamento do banco de dados.</p>

<h2>Rotas no servidor</h2>

POST /login: Rota de login. No corpo da requisição, envie o email e a senha do usuário.

GET /user/:id: Rota para buscar um usuário por ID.

PATCH /user/:id: Usa o método PATCH para atualizar o usuário. No corpo da requisição, envie o email e o nome do usuário.

POST /user: Usa o método POST para criar um usuário. No corpo da requisição, envie os campos de email, senha e nome.

DELETE /user/:id: Usa o método DELETE para deletar um usuário.

GET /user?page=1&pageSize=8: Usa o método GET para buscar todos os usuários com paginação e quantidade de itens por página.

GET /me: Usa o método GET para buscar o usuário logado.

POST /movie: Usa o método POST para criar um filme. No corpo da requisição, envie o título, gênero e ano de lançamento do filme.

GET /movie/:id: Usa o método GET para buscar um filme por ID.

PATCH /movie/:id: Usa o método PATCH para atualizar um filme. No corpo da requisição, envie o título, gênero e ano de lançamento do filme.

DELETE /movie/:id: Usa o método DELETE para deletar um filme.

GET /movie?page=1&pageSize=8: Usa o método GET para buscar todos os filmes com paginação e quantidade de itens por página.

A única rota pública é a de login; as demais exigem um token de autenticação.

<p>Certifique-se de ajustar as configurações conforme necessário e boa execução!</p>