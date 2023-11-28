### TCC: Desenvolvimento de um sistema para análise de dados a partir da plataforma de gestão de projetos Bitrix24, utilizando React.js e Node.js
Este trabalho descreve a criação de um sistema de análise de dados integrado com a API de gerenciamento de tarefas do Bitrix24, utilizando as tecnologias React.js, 
Node.js e PostgreSQL. Este projeto exemplifica a disponibilização de um dashboard por meio da aplicação de princípios de engenharia de software para aprimorar a 
eficiência operacional e a tomada de decisões baseadas em dados em um ambiente real de colaboração que utiliza o Bitrix24 como plataforma de gerenciamento de tarefas, 
para o funcionamento correto do sistema, são necessárias as seguintes configurações:

###Configurações
O arquivo chamado “example.env” contém o nome das chaves necessárias para o sistema funcionar, esta configuração existe tanto no back-end no front-end e deverão ser configuradas de acordo com as chaves geradas pelo próprio usuário. 
No caso de hosts em nuvem, será necessário preencher as chaves necessárias conforme permitido e configurado pelo ambiente específico.
Se o host for local, basta realizar a configuração desses arquivos e renomeá-los para “.env”, e este vai ser o caso que eu vou exemplificar abaixo. 

# Back-end
-DATABASE_USER, DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD:
1-Deve-se ter uma conexão válida com uma base de dados PostgreSQL seja local ou em nuvem.
2-Executar o script de criação de tabela, disponibilizado pelo projeto dentro da pasta "db".
2-Preencher as chaves descritas acima no arquivo .env do backend com as credenciais obtidas na criação da conexão com a base de dados.

-JWT_SECRET_KEY: pode ser qualquer string, inclusive a padrão disponibilizada pelo example.env.
-BITRIX_CLIENT_ID e BITRIX_CLIENT_SECRET: são as de conexão com a API do Bitrix24, disponibilizadas e criadas dentro da própria plataforma Bitrix24 pelo usuário que tem acesso aos projetos da organização
-BITRIX_URL: serve para o redirecionamento do site do Bitrix24, é a URL do Bitrix24 que está sendo integrado, como padrão na example.env é a URL do site brasileiro bitrix24.com.br, 
caso for utilizado pela organização o bitrix24.com, esta chave deverá ser alterada para o próprio bitrix24.com.
-BASE_FRONT_URL, a URL de acesso do front-end, para o redirecionamento ao autenticar no Bitrix24 na parte do login do sistema.

Supondo que esteja rodando local, a conexão da base usa as mesmas chaves que são usadas como padrão por este sistema, o JWT não precise ser alterado, o site do domínio do Bitrix24 que vai integrar na aplicação 
é o brasileiro (bitrix24.com.br) e o front-end esteja rodando em: http://localhost:3000, as únicas chaves que precisariam de atenção do usuário são as BITRIX_CLIENT_ID e BITRIX_CLIENT_SECRET, que a plataforma Bitrix24 
disponibiliza assim que o usuário cria um "aplicativo" dentro do Bitrix da organização, por meio de uma conta que tenha os privilégios. Lembrando que só a versão paga do Bitrix24 pode utilizar este recurso.
Atualmente (28/11/2023) esta criação fica na plataforma Bitrix24, após entrar no domínio da organização: no menu lateral na esquerda, em Aplicativos > Recursos para desenvolvedores > Aplicativo local.
Assim ficaria o arquivo .env do back-end (localhost, disponibilizado no example.env, ainda necessitando da mudança das duas chaves do Bitrix descritas acima):

DATABASE_USER=postgres
DATABASE_HOST=localhost
DATABASE_NAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET_KEY=99999a9999aAA
BITRIX_CLIENT_ID=local.999a99aaa9a999.99999999
BITRIX_CLIENT_SECRET=A9aA99AAAaAAAaAaAaA9AAaa9AA9A9AAaaAAAAAAaA9aAAaaa9
BITRIX_URL=bitrix24.com.br
BASE_FRONT_URL=http://localhost:3000

# Front-end
Existe apenas uma chave: REACT_APP_API_URL, este é o endereço que o back-end disponibiliza para a conexão do front-end, como padrão local, http://localhost:4000.
Assim ficaria o arquivo .env do front-end (localhost, disponibilizado no example.env):

REACT_APP_API_URL=http://localhost:4000
