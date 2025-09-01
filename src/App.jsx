import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Download, FileText, Clock, Save } from 'lucide-react'
import jsPDF from 'jspdf'
import './App.css'

function App() {
  const [answers, setAnswers] = useState({})
  const [startTime] = useState(new Date())

  const questions = [
    {
      id: 1,
      text: 'Segundo o art. 1º do Código Penal "Art. 1º - Não há crime sem __________________ que o defina. Não há pena sem ____________________________."',
      blanks: 2
    },
    {
      id: 2,
      text: 'Segundo o art. 5º do Código Penal "Art. 5º - Aplica-se a lei brasileira, sem prejuízo de _______________, _______________e _____________________________, ao crime cometido no território nacional. § 1º - Para os efeitos penais, consideram-se como extensão do território nacional as embarcações e aeronaves brasileiras, de _________________________ ou a _______________________________ onde quer que se encontrem, bem como as aeronaves e as embarcações brasileiras, _______________ ou de _________________________, que se achem, respectivamente, no espaço aéreo correspondente ou em alto-mar. § 2º - É também aplicável a lei brasileira aos crimes praticados a bordo de aeronaves ou embarcações estrangeiras de ____________________________, achando-se aquelas em pouso no __________________________ ou em voo no _________________________, e estas em porto ou mar ________________________."',
      blanks: 10
    },
    {
      id: 3,
      text: 'Segundo o art. 9º do Código Penal "Art. 9º - A sentença estrangeira, quando a aplicação da lei brasileira produz na espécie as mesmas consequências, pode ser homologada no Brasil para: I - obrigar o condenado à _______________________, a _______________________ e a outros _______________________; II - sujeitá-lo a ____________________________. Parágrafo único - A homologação depende: a) para os efeitos previstos no inciso I, de pedido da ____________________________; b) para os outros efeitos, da existência de __________________________ com o país de cuja autoridade judiciária emanou a sentença, ou, na falta de tratado, de ______________________________."',
      blanks: 7
    },
    {
      id: 4,
      text: 'Segundo o art. 10 º do Código Penal "Art. 10 – O ______________________ inclui-se no cômputo do prazo. Contam-se os dias, os meses e os anos pelo ________________________".',
      blanks: 2
    },
    {
      id: 5,
      text: 'Segundo o art. 11 do Código Penal "Art. 11 - Desprezam-se, nas penas privativas de liberdade e nas restritivas de direitos, as ___________________, e, na pena de multa, as ______________________."',
      blanks: 2
    },
    {
      id: 6,
      text: 'Segundo o art. 12 do Código Penal "Art. 12 - As regras gerais deste Código aplicam-se aos fatos incriminados por ____________________, se esta não dispuser de ________________________."',
      blanks: 2
    },
    {
      id: 7,
      text: 'Segundo o art. 13 do Código Penal "Art. 13 - O resultado, de que depende a existência do crime, somente é imputável a ________________________________. Considera-se causa a ação ou omissão sem a qual o ___________________________________. § 2º - A omissão é penalmente relevante quando o omitente __________________________ para evitar o resultado. O dever de agir incumbe a quem: a) tenha por lei obrigação de ___________________, ___________________ ou ___________________; b) de outra forma, ____________________________ de impedir o resultado; c) com seu comportamento anterior, _____________________ da ocorrência do resultado."',
      blanks: 7
    },
    {
      id: 8,
      text: 'Segundo o art. 14 do Código Penal "Art. 14 - Diz-se o crime: I - consumado, quando nele se reúnem _________________________ de sua definição legal; II - tentado, quando, iniciada a execução, não se consuma por _________________________ à vontade do agente. Parágrafo único - Salvo disposição em contrário, pune-se a tentativa com a pena correspondente ao ______________________, diminuída de ______________________."',
      blanks: 4
    },
    {
      id: 9,
      text: 'Segundo o art. 16 do Código Penal "Art. 16 - Nos crimes cometidos sem violência ou grave ameaça à ________________, reparado o dano ou restituída a coisa, até o ___________________________________, por ato voluntário do agente, a pena será reduzida de __________________"',
      blanks: 3
    },
    {
      id: 10,
      text: 'Segundo o art. 17 do Código Penal "Art. 17 - Não se pune a tentativa quando, por _______________________ ou por _________________________, é impossível consumar-se o crime."',
      blanks: 2
    },
    {
      id: 11,
      text: 'Segundo o art. 18 do Código Penal "Art. 18 - Diz-se o crime: I - doloso, quando o agente _____________________ ou _______________________ de produzi-lo;"',
      blanks: 2
    },
    {
      id: 12,
      text: 'Segundo o art. 18 do Código Penal "Art. 18 - Diz-se o crime: II - culposo, quando o agente deu causa ao resultado por _____________________, _____________________ ou _____________________. Parágrafo único - Salvo os casos expressos em lei, ninguém pode ser punido por fato previsto como crime, senão quando o pratica ______________________."',
      blanks: 4
    },
    {
      id: 13,
      text: 'Segundo o art. 23 do Código Penal "Art. 23 - Não há crime quando o agente pratica o fato: I - em ___________________________; II - em _________________________; III - em _______________________________________ ou no ______________________________. Parágrafo único - O agente, em qualquer das hipóteses deste artigo, ___________________ pelo excesso doloso ou culposo."',
      blanks: 5
    },
    {
      id: 14,
      text: 'Segundo o art. 26 do Código Penal "Art. 26 - É __________________ o agente que, por __________________________ ou ____________________________ incompleto ou retardado, era, ao tempo da ação ou da omissão, inteiramente incapaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento. Parágrafo único - A pena pode ser reduzida de _____________________, se o agente, em virtude de ____________________________ ou por ____________________________ incompleto ou retardado não era inteiramente capaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento."',
      blanks: 6
    },
    {
      id: 15,
      text: 'Segundo o art. 28 do Código Penal "Art. 28 - Não excluem a imputabilidade penal: I - a __________________ ou a ____________________; § 2º - A pena pode ser reduzida de ______________________, se o agente, por embriaguez, proveniente de _____________________________________, não possuía, ao tempo da ação ou da omissão, a __________________________ de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento."',
      blanks: 5
    },
    {
      id: 16,
      text: 'Segundo o art. 1º do Código de Processo Penal "Art. 1o O processo penal reger-se-á, em todo o território brasileiro, por este, ressalvados: I - os ______________________, as ______________________ e _____________________________; II - as prerrogativas constitucionais do _________________________, dos _________________________, nos crimes conexos com os do Presidente da República, e dos ___________________________________, nos crimes de responsabilidade"',
      blanks: 6
    },
    {
      id: 17,
      text: 'Segundo o art. 3º-C do Código de Processo Penal "Art. 3º-C. A competência do juiz das garantias abrange todas as infrações penais, exceto as de _________________________, e cessa com o recebimento da denúncia ou queixa na forma do art. 399 deste Código. § 2º As decisões proferidas pelo juiz das garantias _______________________ o juiz da instrução e julgamento, que, após o recebimento da denúncia ou queixa, deverá reexaminar a necessidade das ____________________________, no prazo máximo de 10 dias. § 3º Os autos que compõem as matérias de competência do juiz das garantias ficarão acautelados na secretaria desse juízo, à disposição do Ministério Público e da defesa, e não serão apensados aos autos do processo enviados ao juiz da instrução e julgamento, ressalvados os documentos relativos às _________________________, ____________________________ ou de ___________________________, que deverão ser remetidos para apensamento em apartado."',
      blanks: 6
    },
    {
      id: 18,
      text: 'Segundo o art. 3º-D do Código de Processo Penal "Art. 3º-D. O juiz que, na fase de investigação, praticar qualquer ato incluído nas competências dos arts. 4º e 5º deste Código ficará __________________ de funcionar no processo. Parágrafo único. Nas comarcas em que funcionar _____________________, os tribunais criarão um sistema de rodízio de magistrados, a fim de atender às disposições deste Capítulo."',
      blanks: 2
    },
    {
      id: 19,
      text: 'Segundo o art. 3º-F do Código de Processo Penal "Art. 3º-F. O juiz das garantias deverá assegurar o cumprimento das regras para o tratamento dos presos, impedindo o ______________________________ de qualquer autoridade com _______________________ para explorar a imagem da pessoa submetida à prisão, sob pena de __________________, ______________________e _____________."',
      blanks: 5
    },
    {
      id: 20,
      text: 'Segundo o art. 4º do Código de Processo Penal "Art. 4º A polícia judiciária será exercida pelas _______________________________ no território de suas respectivas _________________________ e terá por fim a apuração das _______________________________________. Parágrafo único. A competência definida neste artigo não excluirá a de ____________________________, a quem por lei seja cometida a mesma função."',
      blanks: 4
    },
    {
      id: 21,
      text: 'Segundo o art. 10 do Código de Processo Penal "Art. 10. O inquérito deverá terminar no prazo de 10 dias, se o indiciado tiver sido _____________________, ou estiver ______________________, contado o prazo, nesta hipótese, a partir do dia em que se executar a ordem de prisão, ou no prazo de 30 dias, quando estiver ________________, mediante _________________. § 1o A ____________________ fará minucioso relatório do que tiver sido apurado e enviará autos ao juiz competente. § 2o No relatório poderá a autoridade indicar _____________________ que não tiverem sido ____________________, mencionando o lugar onde possam ser encontradas. § 3o Quando o fato for de ________________________, e o indiciado estiver ____________, a autoridade poderá requerer ao juiz a devolução dos autos, para ulteriores diligências, que serão realizadas no prazo marcado pelo juiz."',
      blanks: 9
    },
    {
      id: 22,
      text: 'Segundo o art. 13 do Código de Processo Penal "Art. 13. Incumbirá ainda à autoridade policial: I - fornecer às autoridades judiciárias as __________________________ à instrução e julgamento dos processos; II - realizar as _________________________ pelo juiz ou pelo Ministério Público; III - cumprir os _________________________ expedidos pelas autoridades judiciárias; IV - representar acerca da ________________________."',
      blanks: 4
    },
    {
      id: 23,
      text: 'Segundo o art. 14-A do Código de Processo Penal " Art. 14-A. Nos casos em que servidores vinculados às instituições dispostas no art. 144 da Constituição Federal figurarem como investigados em inquéritos policiais, inquéritos policiais militares e demais procedimentos extrajudiciais, cujo objeto for a investigação de fatos relacionados ao __________________________ praticados no exercício profissional, de forma ______________ou ______________, incluindo as situações dispostas no art. 23 do Código Penal , o indiciado poderá constituir defensor. § 1 Para os casos previstos no caput deste artigo, o investigado deverá ser citado da instauração do procedimento investigatório, podendo constituir defensor no prazo de __________________ a contar do ___________________________. § 2º Esgotado o prazo disposto no § 1º deste artigo com ausência de nomeação de defensor pelo investigado, a autoridade responsável pela investigação deverá intimar a _______________________________ o investigado à época da ocorrência dos fatos, para que essa, no prazo de ___________________________, indique defensor para a representação do investigado."',
      blanks: 7
    },
    {
      id: 24,
      text: 'Segundo o art. 22 do Código de Processo Penal "Art. 22. No Distrito Federal e nas comarcas em que houver mais de uma circunscrição policial, a autoridade com exercício em uma delas poderá, nos inquéritos a que esteja procedendo, ordenar diligências em circunscrição de outra, ________________________________ou ___________________, e bem assim providenciará, até que compareça a autoridade competente, sobre qualquer fato que ocorra em sua presença, noutra circunscrição."',
      blanks: 2
    },
    {
      id: 25,
      text: 'Segundo o art. 29 do Código de Processo Penal "Art. 29. Será admitida ação privada nos crimes de ação pública, se esta não for intentada no prazo legal, cabendo ao Ministério Público ____________________, _____________________ e _____________________________, intervir em todos os termos do processo, fornecer elementos de prova, _______________________ e, a todo tempo, no caso de negligência do querelante, ____________________ como parte principal."',
      blanks: 5
    },
    {
      id: 26,
      text: 'Segundo o art. 90 do Código de Processo Penal "Art. 90. Os crimes praticados a bordo de aeronave nacional, dentro do espaço aéreo correspondente ao território brasileiro, ou ao alto-mar, ou a bordo de aeronave estrangeira, dentro do espaço aéreo correspondente ao território nacional, serão processados e julgados pela ________________________ em cujo território se verificar o ______________________, ou pela da comarca de onde houver _______________________."',
      blanks: 3
    },
    {
      id: 27,
      text: 'Segundo o art. 58 do Código de Processo Penal "Art. 58. Concedido o perdão, mediante declaração expressa nos autos, o querelado será intimado a dizer, dentro de __________________, se o aceita, devendo, ao mesmo tempo, ser cientificado de que o seu silêncio ___________________________. Parágrafo único. Aceito o perdão, o juiz julgará ______________________________."',
      blanks: 3
    },
    {
      id: 28,
      text: 'Segundo o art. 60 do Código de Processo Penal "Art. 60. Nos casos em que somente se procede mediante queixa, considerar-se-á perempta a ação penal: I - quando, iniciada esta, o querelante deixar de promover o andamento do processo durante _________________________; II - quando, falecendo o querelante, ou sobrevindo sua incapacidade, não comparecer em juízo, para prosseguir no processo, dentro do prazo de ________________________, qualquer das pessoas a quem couber fazê-lo, ressalvado o disposto no art. 36; III - quando o querelante deixar de comparecer, sem motivo justificado, a _________________________ que deva estar presente, ou deixar de formular o _________________________ nas alegações finais; IV - quando, sendo o querelante pessoa jurídica, esta se ________________________________."',
      blanks: 5
    },
    {
      id: 29,
      text: 'Segundo o art. 70 do Código de Processo Penal "Art. 70. A competência será, de regra, determinada pelo lugar em que se _________________________, ou, no caso de tentativa, pelo lugar em que for praticado o ___________________________. § 1o Se, iniciada a execução no território nacional, a infração se consumar fora dele, a competência será determinada pelo lugar em que tiver sido praticado, no Brasil, o ________________________________. § 3o Quando incerto o limite territorial entre duas ou mais jurisdições, ou quando incerta a jurisdição por ter sido a infração consumada ou tentada nas divisas de duas ou mais jurisdições, a competência firmar-se-á pela ______________________. § 4º Nos crimes previstos no art. 171 do Decreto-Lei nº 2.848, de 7 de dezembro de 1940, quando praticados mediante depósito, mediante emissão de cheques sem suficiente provisão de fundos em poder do sacado ou com o pagamento frustrado ou mediante transferência de valores, a competência será definida pelo local do ___________________________, e, em caso de pluralidade de vítimas, a competência firmar-se-á pela ____________________."',
      blanks: 6
    },
    {
      id: 30,
      text: 'Segundo o art. 76 do Código de Processo Penal "Art. 76. A competência será determinada pela conexão: I - se, ocorrendo 2 (duas) ou mais infrações, houverem sido praticadas, ao _____________________, por várias pessoas _________________, ou por várias pessoas ________________, embora diverso o tempo e o lugar, ou por várias pessoas, ______________________; II - se, no mesmo caso, houverem sido umas praticadas para _________________ ou _______________ as outras, ou para conseguir _______________ ou ______________ em relação a qualquer delas; III - quando a prova de uma infração ou de qualquer de suas circunstâncias elementares _________________________ infração."',
      blanks: 9
    },
    {
      id: 31,
      text: 'Segundo o art. 77 do Código de Processo Penal "Art. 77. A competência será determinada pela continência quando: I – ________________________ pessoas forem acusadas pela _____________________;"',
      blanks: 2
    },
    {
      id: 32,
      text: 'Segundo o art. 78 do Código de Processo Penal "Art. 78. Na determinação da competência por conexão ou continência, serão observadas as seguintes regras: I - no concurso entre a competência do júri e a de outro órgão da jurisdição comum, prevalecerá a competência ____________________; Il - no concurso de jurisdições da mesma categoria: a) preponderará a do lugar da infração, à qual for cominada a _______________________; b) prevalecerá a do lugar em que houver ocorrido o maior número de infrações, se as respectivas penas forem de ______________________; c) firmar-se-á a competência pela prevenção, nos outros casos; III - no concurso de jurisdições de diversas categorias, predominará a de __________________; IV - no concurso entre a jurisdição comum e a especial, prevalecerá ______________."',
      blanks: 5
    },
    {
      id: 33,
      text: 'Segundo o art. 79 do Código de Processo Penal "Art. 79. A conexão e a continência importarão unidade de processo e julgamento, salvo: I - no concurso entre a jurisdição _______________ e a _____________; II - no concurso entre a jurisdição ________________ e a do ________________."',
      blanks: 4
    },
    {
      id: 34,
      text: 'Segundo o art. 5º da Constituição Federal de 1988 "Art. 5º Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade, nos termos seguintes: XLIII - a _______ considerará __________________________ e insuscetíveis de __________________ ou ____________ a prática da tortura, o tráfico ilícito de entorpecentes e drogas afins, o terrorismo e os definidos como crimes hediondos, por eles respondendo os _________________________, os _____________________ e os que, podendo evitá-los, se omitirem; XLIV - constitui _________________________ e _____________________ a ação de grupos armados, civis ou militares, contra a ordem constitucional e o Estado Democrático;"',
      blanks: 7
    },
    {
      id: 35,
      text: 'Segundo o art. 5º da Constituição Federal de 1988 "XLVII - não haverá penas: a) de _______________, salvo em caso de guerra declarada, nos termos do art. 84, XIX; b) de _____________________________; c) de ________________________; d) de __________________; e) ___________________; LI - nenhum brasileiro será extraditado, salvo o __________________, em caso de ___________________, praticado antes da naturalização, ou de comprovado envolvimento em _________________________________________, na forma da lei;"',
      blanks: 8
    },
    {
      id: 36,
      text: 'Segundo o art. 53 da Constituição Federal de 1988 "Art. 53. Os Deputados e Senadores são invioláveis, civil e penalmente, por quaisquer de suas opiniões, palavras e votos. § 1º Os Deputados e Senadores, desde a _________________________, serão submetidos a julgamento perante o Supremo Tribunal Federal. § 2º Desde a ____________________________, os membros do Congresso Nacional não poderão ser ____________, salvo em ___________________________. Nesse caso, os autos serão remetidos dentro de ____________________ à Casa respectiva, para que, pelo voto da ______________________, resolva sobre a prisão. § 3º Recebida a denúncia contra o Senador ou Deputado, por crime ocorrido ______________________, o Supremo Tribunal Federal dará ciência à Casa respectiva, que, por iniciativa de _____________________ nela representado e pelo voto da _________________________, poderá, até a decisão final, sustar o andamento da ação. § 5º A sustação do processo ___________________________, enquanto durar o mandato. § 6º Os Deputados e Senadores não serão obrigados a testemunhar sobre informações recebidas ou prestadas em razão do _____________________________, nem sobre as pessoas que lhes confiaram ou deles receberam informações."',
      blanks: 10
    },
    {
      id: 37,
      text: 'Segundo o art. 54 da Constituição Federal de 1988 "Art. 54. Os Deputados e Senadores não poderão: II - desde a posse: a) ser ___________________, _____________________ ou _______________________ que goze de favor decorrente de contrato com pessoa jurídica de direito público, ou nela exercer função remunerada; b) ocupar _____________ ou ____________ de que sejam ______________________, nas entidades referidas no inciso I, "a"; c) _____________________ em que seja interessada qualquer das entidades a que se refere o inciso I, "a"; d) ser titulares de mais de um _____________________________________."',
      blanks: 8
    },
    {
      id: 38,
      text: 'Segundo o art. 55 da Constituição Federal de 1988 "Art. 55. Perderá o mandato o Deputado ou Senador: III - que deixar de comparecer, em cada sessão legislativa, à 1/3 (terça parte) das ________________________ da Casa a que pertencer, salvo _________________ por esta autorizada; IV - que _________________________ os direitos políticos; V - quando o decretar a ___________________, nos casos previstos nesta Constituição; VI - que sofrer ____________________________________________. § 2º Nos casos dos incisos I, II e VI, a perda do mandato será decidida pela _____________________ ou pelo ____________________, por maioria absoluta, mediante provocação da respectiva ______________ ou de ________________________________________, assegurada ampla defesa. § 3º Nos casos previstos nos incisos III a V, a perda será declarada pela _____________________________, de ofício ou mediante provocação de _________________________________, ou de _________________________________________, assegurada ampla defesa."',
      blanks: 11
    },
    {
      id: 39,
      text: 'Segundo o art. 56 da Constituição Federal de 1988 "Art. 56. Não perderá o mandato o Deputado ou Senador: II - licenciado pela respectiva Casa por motivo de __________________, ou para tratar, _____________________, de ___________________________, desde que, neste caso, o afastamento não ultrapasse ____________________ por sessão legislativa. § 1º O suplente será convocado nos casos de vaga, de investidura em funções previstas neste artigo ou de licença superior a __________________________. § 2º Ocorrendo vaga e não havendo suplente, far-se-á eleição para preenchê-la se faltarem mais de ________________________ para o término do mandato."',
      blanks: 6
    },
    {
      id: 40,
      text: 'Segundo o art. 5º Constituição Federal de 1988 "Art. 5º Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade, nos termos seguintes: LXII - a prisão de qualquer pessoa e o local onde se encontre serão comunicados imediatamente ao _______________________ e à _______________________ ou à pessoa por ele indicada; LXIV - o preso tem direito à identificação dos ___________________________ ou por seu ______________________________; LXXVII - são gratuitas as ações de ____________________ e ______________________, e, na forma da lei, os atos necessários ao exercício da cidadania."',
      blanks: 6
    },
    {
      id: 41,
      text: 'Segundo o art. 66 da Constituição Federal de 1988 "Art. 66. A Casa na qual tenha sido concluída a votação enviará o projeto de lei ao ______________________, que, aquiescendo, o ________________. § 1º Se o ______________________ considerar o projeto, no todo ou em parte, _____________________ ou _______________________________________, vetá-lo-á total ou parcialmente, no prazo de _______________________, contados da data do recebimento, e comunicará, dentro de _______________________________, ao ___________________________ os motivos do veto. § 2º O veto parcial somente abrangerá texto integral de _____________, de _________________, de ________________ ou de ____________________. § 3º Decorrido o prazo de _____________________, o silêncio do ____________________ importará __________."',
      blanks: 12
    },
    {
      id: 42,
      text: 'Segundo o art. 48 da Constituição Federal de 1988 "Art. 48. Cabe ao Congresso Nacional, com a sanção do Presidente da República, não exigida esta para o especificado nos arts. 49, 51 e 52, dispor sobre todas as matérias de competência da União, especialmente sobre: XII - _______________________ e radiodifusão;"',
      blanks: 1
    },
    {
      id: 43,
      text: 'Segundo o art. 48 da Constituição Federal de 1988 "Art. 48. Cabe ao Congresso Nacional, com a sanção do Presidente da República, não exigida esta para o especificado nos arts. 49, 51 e 52, dispor sobre todas as matérias de competência da União, especialmente sobre: VIII - concessão de ______________;"',
      blanks: 1
    },
    {
      id: 44,
      text: 'Segundo o art. 48 da Constituição Federal de 1988 "Art. 48. Cabe ao Congresso Nacional, com a sanção do Presidente da República, não exigida esta para o especificado nos arts. 49, 51 e 52, dispor sobre todas as matérias de competência da União, especialmente sobre: VI - _____________________, _____________________ ou ____________________ de áreas de Territórios ou Estados, ouvidas as respectivas Assembleias Legislativas;"',
      blanks: 3
    },
    {
      id: 45,
      text: 'Segundo o art. 48 da Constituição Federal de 1988 "Art. 48. Cabe ao Congresso Nacional, com a sanção do Presidente da República, não exigida esta para o especificado nos arts. 49, 51 e 52, dispor sobre todas as matérias de competência da União, especialmente sobre: XV - fixação do subsídio dos _____________________________________________, observado o que dispõem os arts. 39, § 4º; 150, II; 153, III; e 153, § 2º, I."',
      blanks: 1
    },
    {
      id: 46,
      text: 'Segundo o art. 49 da Constituição Federal de 1988 "Art. 49. É da competência exclusiva do Congresso Nacional: III - autorizar o _____________________ e o ________________________ a se ausentarem do País, quando a ausência exceder a ___________________;"',
      blanks: 3
    },
    {
      id: 47,
      text: 'Segundo o art. 49 da Constituição Federal de 1988 "Art. 49. É da competência exclusiva do Congresso Nacional: V - sustar os atos normativos do Poder Executivo que exorbitem do ____________________ ou dos limites de ___________________________;"',
      blanks: 2
    },
    {
      id: 48,
      text: 'Segundo o art. 65 da Constituição Federal de 1988 "Art. 65. O projeto de lei aprovado por uma Casa será revisto pela outra, em ______________________ de discussão e votação, e enviado à ___________ ou ______________, se a Casa revisora o ________________, ou arquivado, se o _____________. Parágrafo único. Sendo o projeto emendado, voltará à _____________________."',
      blanks: 6
    },
    {
      id: 49,
      text: 'Segundo o art. 51 da Constituição Federal de 1988 "Art. 51. Compete privativamente à Câmara dos Deputados: II - proceder à tomada de contas do Presidente da República, quando não apresentadas ao _____________________ dentro de __________________ após a abertura da sessão legislativa;"',
      blanks: 2
    },
    {
      id: 50,
      text: 'Segundo o art. 52 da Constituição Federal de 1988 "Art. 52. Compete privativamente ao Senado Federal: I - processar e julgar o _________________________ e o ______________________________ nos crimes de responsabilidade, bem como os ________________________________ e os _____________________________________, do ______________________e da ______________________ nos crimes da mesma natureza conexos com aqueles; II processar e julgar os __________________________________________________, os membros do ___________________________________________ e do ________________________________________, o _____________________________________ e o _____________________________________ nos crimes de responsabilidade; X - ________________________, no todo ou em parte, de lei declarada inconstitucional por decisão _______________ do Supremo Tribunal Federal; Parágrafo único. Nos casos previstos nos incisos I e II, funcionará como Presidente o do _____________________________________________, limitando-se a condenação, que somente será proferida por __________________ dos votos do Senado Federal, à _____________________, com ___________________________________, para o _______________________________, sem prejuízo das demais sanções judiciais cabíveis."',
      blanks: 16
    }
  ]

  const handleAnswerChange = (questionId, blankIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${questionId}-${blankIndex}`]: value
    }))
  }

  const saveProgress = () => {
    localStorage.setItem('simulado-answers', JSON.stringify(answers))
    localStorage.setItem('simulado-start-time', startTime.toISOString())
    alert('Progresso salvo com sucesso!')
  }

  const loadProgress = () => {
    const savedAnswers = localStorage.getItem('simulado-answers')
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
      alert('Progresso carregado com sucesso!')
    } else {
      alert('Nenhum progresso salvo encontrado.')
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const currentTime = new Date()
    const duration = Math.floor((currentTime - startTime) / 1000 / 60) // em minutos
    
    // Configurações do PDF
    doc.setFontSize(16)
    doc.text('SIMULADO 2 - LEI SECA', 105, 20, { align: 'center' })
    doc.setFontSize(14)
    doc.text('DELTA', 105, 30, { align: 'center' })
    doc.setFontSize(12)
    doc.text('Caderno de Respostas', 105, 40, { align: 'center' })
    
    // Informações do simulado
    doc.setFontSize(10)
    doc.text(`Data: ${currentTime.toLocaleDateString('pt-BR')}`, 20, 55)
    doc.text(`Horário de início: ${startTime.toLocaleTimeString('pt-BR')}`, 20, 62)
    doc.text(`Horário de conclusão: ${currentTime.toLocaleTimeString('pt-BR')}`, 20, 69)
    doc.text(`Tempo total: ${duration} minutos`, 20, 76)
    
    let yPosition = 90
    const pageHeight = doc.internal.pageSize.height
    const margin = 20
    
    questions.forEach((question, index) => {
      // Verifica se precisa de nova página
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }
      
      // Número da questão
      doc.setFontSize(10)
      doc.setFont(undefined, 'bold')
      doc.text(`${question.id} –`, margin, yPosition)
      
      // Texto da questão com respostas
      let questionText = question.text
      let blankIndex = 0
      
      // Substitui os underscores pelas respostas
      questionText = questionText.replace(/_+/g, () => {
        const answer = answers[`${question.id}-${blankIndex}`] || '_______________'
        blankIndex++
        return `[${answer}]`
      })
      
      doc.setFont(undefined, 'normal')
      const splitText = doc.splitTextToSize(questionText, 170)
      doc.text(splitText, margin + 15, yPosition)
      
      yPosition += splitText.length * 5 + 10
    })
    
    // Salva o PDF
    doc.save(`Simulado_Lei_Seca_Respostas_${currentTime.toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`)
  }

  const renderQuestionWithBlanks = (question) => {
    let questionText = question.text
    let blankIndex = 0
    const parts = []
    let lastIndex = 0

    // Encontra todos os underscores e os substitui por campos de input
    const regex = /_+/g
    let match

    while ((match = regex.exec(questionText)) !== null) {
      // Adiciona o texto antes do underscore
      if (match.index > lastIndex) {
        parts.push(questionText.substring(lastIndex, match.index))
      }

      // Adiciona o campo de input
      parts.push(
        <Input
          key={`${question.id}-${blankIndex}`}
          className="inline-block w-32 mx-1 h-8 text-sm"
          value={answers[`${question.id}-${blankIndex}`] || ''}
          onChange={(e) => handleAnswerChange(question.id, blankIndex, e.target.value)}
          placeholder="..."
        />
      )

      lastIndex = regex.lastIndex
      blankIndex++
    }

    // Adiciona o texto restante
    if (lastIndex < questionText.length) {
      parts.push(questionText.substring(lastIndex))
    }

    return parts
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              SIMULADO 2 - LEI SECA
            </CardTitle>
            <p className="text-xl text-gray-600">DELTA</p>
            <p className="text-sm text-gray-500">Caderno de Questões</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Iniciado às {startTime.toLocaleTimeString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>{questions.length} questões</span>
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <Button onClick={saveProgress} variant="outline" size="sm">
                <Save className="w-4 h-4 mr-1" />
                Salvar Progresso
              </Button>
              <Button onClick={loadProgress} variant="outline" size="sm">
                Carregar Progresso
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          {questions.map((question) => (
            <Card key={question.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {question.id}
                </div>
                <div className="flex-1">
                  <div className="text-sm leading-relaxed">
                    {renderQuestionWithBlanks(question)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6">
          <div className="text-center">
            <Button 
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Gerar PDF para Correção
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              Clique para gerar um PDF com suas respostas para correção
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App

