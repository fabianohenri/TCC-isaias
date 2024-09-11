# TCC: Desenvolvimento de um sistema para análise de dados a partir da plataforma de gestão de projetos Bitrix24, utilizando React.js e Node.js

Este trabalho foi desenvolvido por mim, validado e desenvolvido como a empresa parceira pediu. Esta entrega é uma base, aqui temos por exemplo: a arquitetura do backend, fazendo toda a integração e a formatação dos dados vindos da API do Bitrix24, autenticação no sistema, e endpoints para busca de dados frescos diretamente do Bitrix24; a arquitetura do frontend conta com a estrutura das rotas, redux, e o dashboard com sistema de filtros; a base de dados, servindo para guardar a autenticação na plataforma.
Note que ainda é um projeto em andamento, que outros alunos darão sequência, por isso, a simplificação dentro do possível foi levada mais em conta que a performance.

Este trabalho descreve a criação de um sistema de análise de dados integrado com a API de gerenciamento de tarefas do Bitrix24, utilizando as tecnologias React.js,
Node.js e PostgreSQL. Este projeto exemplifica a disponibilização de um dashboard por meio da aplicação de princípios de engenharia de software para aprimorar a
eficiência operacional e a tomada de decisões baseadas em dados em um ambiente real de colaboração que utiliza o Bitrix24 como plataforma de gerenciamento de tarefas,
para o funcionamento correto do sistema, são necessárias as seguintes configurações:

# Configurações

O arquivo chamado “example.env” contém o nome das chaves necessárias para o sistema funcionar, esta configuração existe tanto no back-end no front-end e deverão ser configuradas de acordo com as chaves geradas pelo próprio usuário. <br>
No caso de hosts em nuvem, será necessário preencher as chaves necessárias conforme permitido e configurado pelo ambiente específico. <br>
Se o host for local, basta realizar a configuração desses arquivos e renomeá-los para “.env”. <br>
