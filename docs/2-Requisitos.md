# 2 Requisitos
Nesta seção (2) deve-se descrever os requisitos comtemplados na descrição arquitetural, divididos em dois grupos: funcionais e não funcionais. 

## 2.1 Lista de Atores
Nesta seção secundária devem ser apresentados os atores  da sua aplicação. Para iniciar o trabalho, recomenda-se utilizar a abordagem *Design Thinking*, disponível em: 
* https://designthinking.ideo.com/ e;
* https://sebrae.com.br/sites/PortalSebrae/artigos/design-thinking-inovacao-pela-criacao-de-valor-para-o-cliente,c06e9889ce11a410VgnVCM1000003b74010aRCRD. 

## 2.2 Lista de Funcionalidades
Apresentem aqui uma lista das funcionalidades a serem atendidas no projeto, na visão do cliente.
Os requisitos aqui apresentados correspondem às funcionalidades solicitadas pelo parceiro/cliente na visão de negócio, tais como:
* Cadastrar...
* Gerenciar...
* Gerar relatórios ou gráficos...

## 2.3 Requisitos Funcionais
Enumerem os requisitos funcionais previstos para a aplicação a ser desenvolvida. Lembrem-se de listar todos os requisitos que serão implementados, com a dificuldade e a prioridade relativa de cada um no projeto. A dificuldade prevista tem relação com o esforço necessário para implementação, e a prioridade tem relação com a importância daquele requisito específico.

| ID | Descrição Resumida | Dificuldade <br> (B/M/A)* | Prioridade <br> (B/M/A)* |
| -- | ------------------ | -------------------- | ------------------- |
| RF01 | O sistema deve permitir o cadastramento do usuário | B | A |
| RF02 | ...  |  | |
| ... | ... | ...| ... |

*B=Baixa, M=Média, A=Alta.
Obs: acrescente quantas linhas forem  necessárias.

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


