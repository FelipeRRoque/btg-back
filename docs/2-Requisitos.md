# 2 Requisitos
Nesta seção (2) deve-se descrever os requisitos comtemplados na descrição arquitetural, divididos em dois grupos: funcionais e não funcionais. 

## 2.1 Lista de Atores

### 1. João Batista – O Produtor Familiar  
- **Idade:** 52 anos  
- **Gênero:** Masculino  
- **Emprego:** Agricultor familiar (produção de milho e feijão)  
- **Escolaridade:** Ensino Fundamental incompleto  

João vive em uma pequena propriedade rural herdada do pai. Sempre trabalhou com agricultura tradicional, guiando-se pela experiência e pelo “feeling” das estações. Nos últimos anos, porém, tem sofrido com mudanças climáticas imprevisíveis, perdendo parte da produção. Ele deseja evitar prejuízos causados pelo clima e também quer saber o melhor momento para plantar e colher, buscando mais segurança para sustentar sua família.

### 2. Mariana Alves – A Engenheira Agrônoma  
- **Idade:** 34 anos  
- **Gênero:** Feminino  
- **Emprego:** Engenheira Agrônoma (consultora independente)  
- **Escolaridade:** Ensino Superior completo + especialização  

Mariana atende diversos produtores rurais e percebe que muitos tomam decisões com base em informações imprecisas. Ela quer usar tecnologia para levar recomendações mais confiáveis e baseadas em dados. Seu objetivo é validar recomendações técnicas no sistema e acompanhar os resultados das orientações aplicadas para melhorar continuamente seu trabalho.

### 3. Luciana Rocha – A Extensionista Rural  
- **Idade:** 41 anos  
- **Gênero:** Feminino  
- **Emprego:** Técnica em extensão rural  
- **Escolaridade:** Ensino Técnico agrícola  

Luciana trabalha diretamente com pequenos produtores, visitando propriedades e oferecendo orientação. Muitas vezes, sente falta de dados atualizados para tomar decisões rápidas. Ela quer acessar informações atualizadas no campo e registrar visitas e recomendações no sistema para melhorar o acompanhamento dos produtores.

### 4. Roberto Lima – O Gestor de Cooperativa  
- **Idade:** 47 anos  
- **Gênero:** Masculino  
- **Emprego:** Gerente de cooperativa agrícola  
- **Escolaridade:** Ensino Superior em Administração  

Roberto coordena dezenas de produtores e precisa tomar decisões estratégicas para o grupo, como definir períodos de plantio e organizar a logística de produção. Ele busca visualizar dados consolidados dos produtores e planejar ações coletivas com base em informações confiáveis para reduzir perdas e aumentar a produtividade.

### 5. Fernanda Souza – A Pesquisadora  
- **Idade:** 31 anos  
- **Gênero:** Feminino  
- **Emprego:** Pesquisadora em sustentabilidade agrícola  
- **Escolaridade:** Mestrado/Doutorado  

Fernanda estuda o impacto das mudanças climáticas na agricultura familiar e precisa de dados reais para validar suas pesquisas. Ela deseja acessar dados confiáveis e organizados e analisar padrões climáticos e produtivos para gerar conhecimento científico relevante.

### 6. Pedro Santos – O Usuário Visitante  
- **Idade:** 22 anos  
- **Gênero:** Masculino  
- **Emprego:** Estudante de Agronomia  
- **Escolaridade:** Ensino Superior em andamento  

Pedro está começando sua jornada na área agrícola e busca ferramentas para aprender mais sobre o setor. Ele ainda não é produtor, mas pretende se tornar um. Seu interesse é explorar informações agrícolas de forma simples e aprender sobre boas práticas de plantio para se preparar para o futuro.

## 2.2 Lista de Funcionalidades
Apresentem aqui uma lista das funcionalidades a serem atendidas no projeto, na visão do cliente.
Os requisitos aqui apresentados correspondem às funcionalidades solicitadas pelo parceiro/cliente na visão de negócio, tais como:

* Cadastrar usuários (produtores) no sistema.  
* Realizar login e autenticação para acesso seguro à plataforma.
* Gerenciar o perfil do produtor.
* Cadastrar e gerenciar áreas de plantio com sua respectiva localização.  
* Registrar as culturas atualmente plantadas em cada área. 
* Visualizar informações climáticas atuais da região da propriedade.  
* Consultar a previsão do tempo para os próximos dias.  
* Acessar o histórico climático da região.  
* Receber sugestões de culturas adequadas para a região da propriedade.  
* Obter recomendações de plantio baseadas na estação do ano.  
* Receber sugestões de plantio considerando a previsão climática.  
* Utilizar um calendário agrícola para acompanhamento dos períodos de plantio.
* Permitir o acesso simultâneo de múltiplos usuários ao sistema sem comprometer o desempenho da aplicação.
* Permitir que o sistema seja acessado por meio de navegadores web em computadores e dispositivos móveis.
* Manter alta disponibilidade do sistema durante seu funcionamento, garantindo que os usuários possam acessar a aplicação na maior parte do tempo.
* Exibir mensagens informativas ao usuário em situações de indisponibilidade da API externa de dados climáticos, mantendo o funcionamento das demais funcionalidades do sistema.
* Integrar o sistema com APIs externas de dados climáticos para obtenção de informações meteorológicas atualizadas.
* Disponibilizar uma interface responsiva que se adapte automaticamente a diferentes dispositivos e tamanhos de tela.
* Permitir a evolução do sistema.

## 2.3 Requisitos Funcionais
Enumerem os requisitos funcionais previstos para a aplicação a ser desenvolvida. Lembrem-se de listar todos os requisitos que serão implementados, com a dificuldade e a prioridade relativa de cada um no projeto. A dificuldade prevista tem relação com o esforço necessário para implementação, e a prioridade tem relação com a importância daquele requisito específico.

| ID | Descrição Resumida | Dificuldade <br> (B/M/A)* | Prioridade <br> (B/M/A)* |
| -- | ------------------ | -------------------- | ------------------- |
| RF01 | Realizar o login e a autenticação de segurança para acesso às funcionalidades restritas. | B | A |
| RF02 | Efetuar o registro de novos usuários e produtores na plataforma. | B | A |
| RF03 | Exibir as condições meteorológicas atuais da região via integração com APIs de clima. | M | A |
| RF04 | Apresentar a previsão do tempo detalhada para os próximos dias. | M | A |
| RF05 | Disponibilizar informações técnicas e perfis sobre os tipos de cultivos mais comuns. | B | M |
| RF06 | Permitir o cadastramento da localização da propriedade e das áreas de plantio. | M | A |
| RF07 | Gerar recomendações de plantio baseadas na estação do ano e na previsão climática. | A | A |
| RF08 | Manter o registro e consulta do histórico de culturas plantadas e eventos climáticos. | M | M |

*B=Baixa, M=Média, A=Alta.

## 2.4 Requisitos Não Funcionais
Os requisitos não funcionais definem características de qualidade e restrições operacionais do sistema BTG (Best Time to Grow). Diferentemente dos requisitos funcionais, que descrevem as funcionalidades do sistema, os requisitos não funcionais estabelecem critérios relacionados ao desempenho, usabilidade, segurança, disponibilidade e compatibilidade da aplicação.

Esses requisitos são fundamentais para garantir que o sistema seja confiável, acessível e eficiente para os usuários finais, especialmente considerando o público-alvo composto por pequenos produtores e agricultores familiares que utilizam predominantemente dispositivos móveis para acesso à plataforma.

Além disso, os requisitos não funcionais influenciam diretamente as decisões arquiteturais do sistema, como a escolha de tecnologias, a organização modular da aplicação e a integração com serviços externos, como APIs meteorológicas utilizadas para obtenção de dados climáticos.

| ID | Descrição Resumida | Prioridade <br> (B/M/A)* |
| -- | ------------------ | ------------------------ |
| RNF01 | O sistema deve suportar múltiplos usuários simultâneos sem comprometer o desempenho geral da aplicação. | B |
| RNF02 | O sistema deve ser acessível nas plataformas web e dispositivos móveis por meio de navegadores. | A |
| RNF03 | O sistema deve ser compatível com os principais navegadores: Google Chrome, Microsoft Edge e Mozilla Firefox. | M |
| RNF04 | O sistema deve manter disponibilidade mínima de 95% durante seu período de funcionamento. | M |
| RNF05 | Em caso de indisponibilidade da API climática externa, o sistema deve exibir uma mensagem informativa ao usuário sem comprometer o funcionamento das demais funcionalidades. | M |
| RNF06 | O sistema deve garantir que cada usuário tenha acesso apenas aos seus próprios dados e registros de plantio. | B |
| RNF07 | A aplicação deve permitir integração com APIs externas de dados climáticos para obtenção de informações meteorológicas atualizadas. | A |
| RNF08 | A interface do sistema deve ser responsiva, adaptando-se automaticamente a diferentes tamanhos de tela. | A |
| RNF09 | A arquitetura do sistema deve ser modular, permitindo a adição futura de novos serviços ou funcionalidades sem impacto significativo no sistema existente. | B |

*B=Baixa, M=Média, A=Alta.

## 2.5 Descrição Resumida dos Casos de Uso ou Histórias de Usuários
Apresente uma modelagem dos requisitos funcionais previstos para sua aplicação, utilizando a descrição resumida de Casos de Uso ou o formato de Histórias de Usuário.

Exemplo de descrição resumida de Casos de Uso:

| UC01 – NOME DO CASO DE USO |
| -------------------------- |
| Descrição |  |
| Atores    | Teste  |
| Prioridade | |
| Requisitos associados | |
| Fluxo Principal | |


Exemplo de História de Usuários:

| EU, <br> COMO... <br> PAPEL |  QUERO/PRECISO... <br> FUNCIONALIDADE | PARA... <br> MOTIVO/VALOR |
| ---- | ---- | ---- |
| José, Gestor da ONG... | Como um gestor, quero... | Melhorar o atendimento... |


## 2.6 Restrições Arquiteturais
Enumerem as principais restrições arquiteturais. Restrições arquiteturais geralmente não são consideradas requisitos, mas apenas limitam a solução a ser desenvolvida, obrigando-a a atendê-las. 
 As restrições impostas ao projeto que afetam sua arquitetura podem ser, por ex.:
 * O software deverá ser desenvolvido em Python, no framework Django;
 * A API desenvolvida deve seguir o padrão ReSTful.

## 2.7 Mecanismos Arquiteturais 
Esta seção deve apresentar uma visão geral dos mecanismos que compõem a arquitetura do sosftware baseando-se em três estados: (1) análise, (2) design e (3) implementação. 
Na coluna Análise devem ser listados os aspectos gerais que compõem a arquitetura do software, tais como: persistência, integração com sistemas legados, geração de logs do sistema, ambiente de Front-End, tratamento de exceções, formato dos testes, formato de distribuição/implantação (deploy), dentre outros. 
A coluna Design deve identificar o padrão tecnológico a seguir para cada mecanismo identificado na Análise.
A coluna Implementação deve identificar o produto/ferramenta a ser utilizado na solução específica.

| Análise | Design | Implementação | 
|--- | --- | --- |
| Persistência | ORM | Hibernate |
| Front end | Biblioteca JS | React, JavaScript, HTML |
| Back end | Biblioteca JS | Node, com o framework Next.JS |
| Integração | | |
| Teste de Software | | |
| Deploy | | |
| ... | | |


