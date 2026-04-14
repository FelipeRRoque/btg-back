# 3 Modelagem e diagramas arquiteturais: (Modelo C4)
A solução do sistema BTG (Best Time to Grow) é baseada em uma arquitetura cliente-servidor em três camadas. A camada de apresentação (frontend), desenvolvida em JavaScript, fornece uma interface web responsiva acessada por navegadores, permitindo que o usuário interaja com o sistema. Essa camada se comunica via HTTP/JSON com a camada de aplicação (backend), implementada em C# com API REST, responsável pela lógica de negócio, autenticação e geração de recomendações de plantio com base em clima e estação. Por fim, a camada de persistência utiliza um banco de dados relacional (PostgreSQL/MySQL) para armazenar usuários, propriedades e dados agrícolas, além da integração com uma API meteorológica externa para obtenção de informações climáticas.



<p align="center">
  <img src="./images/solucao_geral_BTG.png" alt="Diagrama de Contexto"> <br>
  Figura 1: Visão Geral da Solução (camadas)
</p>




## 3.1 Nível 1: Diagrama de Contexto

O diagrama de contexto apresenta uma visão macro do sistema **BTG Web**, destacando sua interação com os principais atores e sistemas externos. No centro está o sistema, utilizado pelo **Usuário do BTG**, que representa o consumidor da aplicação com acesso às funcionalidades por meio de uma interface web.

O usuário interage com o sistema para consultar informações climáticas e gerenciar dados relacionados ao plantio. Além disso, o sistema se integra a um serviço externo, o **OpenMeteo**, responsável por fornecer dados de previsão do tempo em tempo real (figura 2).



<p align="center">
  <img src="./images/diagrama-de-contexto-nivel-1.jpg" alt="Diagrama de Contexto"><br>
  Figura 2: Diagrama de Contexto  (fonte: própria)
</p>



## 3.2 Nível 2: Diagrama de Contêiner

O diagrama de contêiner apresenta a arquitetura de alto nível do sistema, evidenciando como as responsabilidades estão distribuídas entre diferentes partes da aplicação e quais tecnologias são utilizadas.

O sistema é composto por quatro principais contêineres:

- **Web Page (SPA)**: Desenvolvida em React, é responsável pela interface com o usuário, permitindo a visualização de dados climáticos e o gerenciamento de informações de plantio.
- **Web Application (NGINX)**: Atua como servidor web, responsável por entregar o conteúdo estático da aplicação (HTML, CSS, JavaScript).
- **Sistema BackEnd BTG**: Desenvolvido em .NET, concentra a lógica de negócio, processa as requisições do usuário e realiza integrações externas.
- **Database (MySQL)**: Responsável pelo armazenamento persistente dos dados dos usuários e das informações de plantio.

A comunicação entre os contêineres ocorre principalmente via HTTP/HTTPS e troca de dados em formato JSON. O frontend consome a API do backend, que por sua vez acessa o banco de dados e integra-se com a API externa do OpenMeteo para obtenção de dados climáticos (figura 3).

<p align="center">
  <img src="./images/diagrama-de-contexto-nivel-2.jpg" alt="Diagrama de Contêiner"><br>
  Figura 3 – Diagrama de Contêiner  (fonte: própria)
</p>



## 3.3 Nível 3: Diagrama de Componentes
O diagrama de componentes detalha a estrutura interna do contêiner de backend, evidenciando os principais componentes, suas responsabilidades e os padrões arquiteturais adotados.

A arquitetura segue principalmente os padrões **MVC (Model-View-Controller)** e **Mediator**, promovendo desacoplamento e organização da lógica de negócio.

### Componentes:

- **Controller Plantio**  
  Atua como ponto de entrada das requisições HTTP (REST). Recebe as solicitações do frontend e as encaminha para a camada de aplicação.

- **MediatR**  
  Responsável por intermediar a comunicação entre os componentes, desacoplando o controller da lógica de negócio e direcionando as requisições para os handlers apropriados.

- **Handler Plantio**  
  Contém a lógica de negócio específica das operações relacionadas ao plantio, processando os dados recebidos e coordenando a persistência.

- **Repository Plantio**  
  Responsável pelo acesso aos dados, executando operações no banco de dados, como inserções e consultas.

O backend também se comunica com um serviço externo de previsão do tempo (OpenMeteo), integrando esses dados às funcionalidades do sistema (figura 4).


<p align="center">
  <img src="./images/diagrama-de-contexto-nivel-3.jpg" alt="Diagrama de Contexto"><br>
  Figura 4 – Diagrama de Componentes  (fonte: própria)
</p>



## 3.4 Nível 4: Código

O Nível 4 do modelo C4 aprofunda-se na estrutura interna de implementação do sistema. Para o projeto BTG, este nível é representado pelo Diagrama Entidade-Relacionamento (DER), que detalha a arquitetura física de persistência no banco de dados MySQL, consumida diretamente pelos componentes de Repositório descritos no nível anterior.

O diagrama a seguir ilustra a modelagem relacional projetada para suportar de forma íntegra as operações da aplicação. Ele evidencia as tabelas fundamentais e seus relacionamentos: o gerenciamento de perfis de atores (users), a organização do espaço físico rural (properties e planting_areas), o catálogo de sementes (crops), o acompanhamento do calendário agrícola (planting_records) e a estruturação do motor de regras climáticas (recommendations). A utilização de identificadores globais únicos (GUIDs) e colunas de auditoria temporal em todas as entidades garante a segurança, a rastreabilidade e a consistência das informações armazenadas pela plataforma.

<p align="center">
  <img src="./images/diagrama_ER.png" alt="Diagrama de Entidade Relacionamento" width="600"> <br>
  Figura 4 – Diagrama de Entidade Relacionamento (DER)
</p>
