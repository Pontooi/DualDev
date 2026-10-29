import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Clock, 
  Copy, 
  Check, 
  GitBranch, 
  AlertCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSlideIndex: number;
}

interface Speaker {
  id: number;
  name: string;
  role: string;
  slide: string;
  duration: string;
  text: string;
  tips: string;
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: 'Integrante 1',
    role: 'Abertura, O Problema & O que é o DualDev',
    slide: 'Slide 1 & Slide 2 (Card 1)',
    duration: '30 seg a 1 min',
    tips: 'Fale de cabeça erguida, com tom caloroso e focado na empatia com quem quer começar a programar.',
    text: `"Olá a todos! Nosso projeto se chama DualDev.

Quem já tentou aprender a programar sabe que o primeiro dia costuma ser muito frustrante. Antes de ver o primeiro resultado, a pessoa precisa baixar programas pesados, configurar variáveis no sistema e resolver erros que nem ela entende. Muitos desistem antes mesmo de escrever a primeira linha de código.

O DualDev foi criado para resolver exatamente isso. Ele é uma academia online de programação onde qualquer pessoa clica no link, abre a página no navegador e já começa a praticar imediatamente. Não precisa instalar absolutamente nada no computador: você lê a explicação, digita o código e aperta um botão para ver ele rodar no mesmo segundo."`
  },
  {
    id: 2,
    name: 'Integrante 2',
    role: 'As Trilhas de Aprendizagem & Os 100 Desafios',
    slide: 'Slide 2 (Card 2) & Slide 3',
    duration: '1 a 2 min',
    tips: 'Destaque o número de 100 exercícios e o formato de jogo (XP, níveis e conquistas).',
    text: `"Para ensinar de forma organizada, dividimos a plataforma em 5 trilhas de conhecimento, cobrindo as tecnologias mais pedidas e usadas hoje em dia:

1. Java: excelente para entender lógica estruturada e regras de programação;
2. Python: famosa por ter uma escrita limpa e fácil de entender;
3. JavaScript: a linguagem que dá vida e interatividade aos sites;
4. HTML: que cria o esqueleto e a estrutura das páginas da internet;
5. CSS: que cuida das cores, visual, espaçamentos e design.

O mais legal é que cada uma dessas 5 linguagens conta com exatamente 20 atividades práticas, somando 100 exercícios no total! 

E tudo foi pensado como um jogo: conforme o aluno vai resolvendo os desafios, ele ganha pontos de experiência (XP), sobe de nível e desbloqueia conquistas. Isso ajuda o estudante a se manter motivado e praticar todos os dias."`
  },
  {
    id: 3,
    name: 'Integrante 3',
    role: 'A Mágica da Execução no Navegador (Sem Servidor)',
    slide: 'Slide 3 (Diferencial) & Slide 5',
    duration: '1 a 2 min',
    tips: 'Explique para os jurados leigos a vantagem de não depender de servidor na nuvem.',
    text: `"Agora vem um dos pontos mais importantes do projeto: como o código roda?

A maioria dos sites de ensino envia o código digitado pelo aluno para um servidor distante na nuvem, que processa a informação e devolve a resposta alguns segundos depois. Além de demorar, se o servidor cair ou a conexão oscilar, ninguém mais consegue estudar.

No DualDev, nós fizemos diferente: toda a execução acontece 100% dentro do próprio navegador do aluno, no seu computador ou notebook.

O que isso significa na prática?
Primeiro: a velocidade é imediata. Você clica em 'Executar' e a resposta aparece em frações de segundo. 
Segundo: o site não gasta internet com servidores pesados e nunca fica fora do ar por sobrecarga, tornando a ferramenta muito mais estável, sustentável e acessível."`
  },
  {
    id: 4,
    name: 'Integrante 4',
    role: 'Como Cada Linguagem é Interpretada na Prática',
    slide: 'Slide 3 & Slide 5 (Desafios Superados)',
    duration: '1 a 2 min',
    tips: 'Mantenha a explicação simples e visual, sem se perder em termos puramente acadêmicos.',
    text: `"Mas como o navegador consegue entender tantas linguagens diferentes se ele só foi feito para entender a web nativamente? Nós criamos uma lógica simplificada para cada uma:

- No JavaScript: O próprio navegador já sabe rodar nativamente. O que nós fizemos foi criar um ambiente seguro que captura as mensagens impressas e mostra no nosso terminal da tela.

- No Python: Criamos um interpretador visual que lê o código linha por linha, entende os blocos pelos espaços no início (a indentação), guarda as variáveis e calcula o resultado na hora.

- No Java: Como o Java exige uma estrutura com classe e método principal, o nosso sistema lê essa estrutura, confere as regras, simula as contas e as impressões de texto como se fosse uma máquina Java virtual.

- No HTML e no CSS: O navegador lê as tags e estilos digitados pelo estudante e um verificador confere instantaneamente se os botões, títulos ou cores pedidos no exercício estão corretos."`
  },
  {
    id: 5,
    name: 'Integrante 5',
    role: 'Demonstração Prática da Tela & Conclusão',
    slide: 'Slide 4 (Demonstração ao Vivo)',
    duration: '3 a 4 min',
    tips: 'Enquanto você fala, compartilhe a tela ou mostre a tela da DualDev funcionando ao vivo, clicando em Executar.',
    text: `"E para juntar tudo isso, a experiência de quem usa a plataforma é dividida de forma muito clara na tela:

Do lado esquerdo, o aluno tem o Painel de Teoria, com a explicação bem didática, o objetivo da aula e dicas caso ele tenha dúvidas.
Do lado direito, ele tem um Editor de Código com numeração de linhas e atalhos que ajudam a digitar mais rápido.
E logo abaixo, fica o nosso Terminal, que funciona como um professor particular: ao clicar em 'Verificar', ele testa o código na hora e mostra se o exercício PASSOU com um selo verde ou onde está o erro com orientações claras.

Além das aulas, temos o Playground Livre, que é um laboratório aberto para o aluno testar qualquer ideia que tiver na cabeça.

Em resumo, o DualDev prova que aprender a programar não precisa ser complicado, demorado nem assustador. Qualquer pessoa com acesso à internet pode abrir o site e dar seus primeiros passos na tecnologia de forma leve, gratuita e divertida.

Muito obrigado a todos!"`
  }
];

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({ 
  isOpen, 
  onClose,
  activeSlideIndex 
}) => {
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<number>(activeSlideIndex + 1 > 5 ? 1 : activeSlideIndex + 1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'roteiro' | 'github'>('roteiro');

  if (!isOpen) return null;

  const currentSpeaker = speakers.find(s => s.id === selectedSpeakerId) || speakers[0];

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f172a] border border-purple-900/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Topo do Modal */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141f35] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-purple-900/40 text-purple-300 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#EA580C]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Roteiro de Apresentação Dividido para 5 Integrantes
              </h3>
              <p className="text-[11px] text-slate-400">
                Linguagem simples, direta e acessível para o público leigo (Desafio Proz Web)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#0b101b] p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('roteiro')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'roteiro' ? 'bg-[#3B0764] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Roteiro das 5 Pessoas
              </button>
              <button
                onClick={() => setActiveTab('github')}
                className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'github' ? 'bg-[#EA580C] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                Guia GitHub Actions
              </button>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        {activeTab === 'roteiro' ? (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Barra lateral de seleção dos 5 apresentadores */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-[#0e1626]/70 p-3 space-y-1 overflow-y-auto">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Integrantes da Equipe
              </p>
              {speakers.map((s) => {
                const isSelected = s.id === selectedSpeakerId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpeakerId(s.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col ${
                      isSelected
                        ? 'bg-[#3B0764] text-white shadow-md border border-purple-500/30'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{s.name}</span>
                      <span className="text-[10px] text-orange-400 font-mono">{s.duration}</span>
                    </div>
                    <span className="text-[10px] text-slate-300 truncate mt-0.5 opacity-90">
                      {s.role}
                    </span>
                  </button>
                );
              })}

              <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-900/30 text-[11px] text-purple-200">
                <p className="font-semibold text-orange-400 mb-1">⏱️ Dica de Tempo Total:</p>
                <p className="leading-relaxed">
                  Somando cerca de 1 a 1:30 min por integrante, a apresentação dura entre <strong>6 e 8 minutos</strong>, respeitando perfeitamente o tempo do desafio!
                </p>
              </div>
            </div>

            {/* Visualizador da Fala Selecionada */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#EA580C] text-white text-[10px] font-bold">
                      {currentSpeaker.name}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#ffbe82]" />
                      Tempo sugerido: {currentSpeaker.duration}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">
                    {currentSpeaker.role}
                  </h4>
                  <p className="text-xs text-purple-300">
                    Slide correspondente: {currentSpeaker.slide}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(currentSpeaker.text, currentSpeaker.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors border border-slate-700 self-start sm:self-auto"
                >
                  {copiedId === currentSpeaker.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Fala</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dica de Apresentação */}
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#ffbe82] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Orientação para a postura:</strong>{' '}
                  {currentSpeaker.tips}
                </div>
              </div>

              {/* Texto Completo da Fala */}
              <div className="bg-[#0b101b] rounded-xl p-5 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans select-text">
                {currentSpeaker.text}
              </div>
            </div>
          </div>
        ) : (
          /* Aba de Suporte do GitHub Actions */
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-500/40 text-orange-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block mb-1">
                  Solução para o Erro no GitHub Actions: "Dependencies lock file is not found"
                </strong>
                <p className="leading-relaxed">
                  Esse erro ocorreu porque a ação <code className="bg-black/40 px-1 py-0.5 rounded text-orange-300">actions/setup-node@v4</code> estava configurada com <code className="bg-black/40 px-1 py-0.5 rounded text-orange-300">cache: 'npm'</code>, mas o repositório no GitHub não tinha o arquivo <code className="bg-black/40 px-1 py-0.5 rounded text-white">package-lock.json</code> commitado na raiz!
                </p>
              </div>
            </div>

            <div className="bg-[#0b101b] rounded-xl p-5 border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#EA580C]" />
                Como resolver definitivamente no seu GitHub:
              </h4>

              <div className="space-y-2">
                <p className="font-semibold text-[#ffbe82]">Opção 1 (Recomendada): Gerar e commitar o package-lock.json</p>
                <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                  npm install --package-lock-only<br />
                  git add package-lock.json<br />
                  git commit -m "fix: adiciona package-lock.json para o github actions"<br />
                  git push origin main
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-[#ffbe82]">Opção 2: Remover a linha "cache: 'npm'" do arquivo .github/workflows/build.yml</p>
                <p className="text-slate-400 text-xs">
                  Abra o arquivo <code className="text-purple-300">.github/workflows/build.yml</code>, encontre a etapa do <code className="text-purple-300">setup-node</code> e remova ou comente a linha <code className="text-rose-400">cache: 'npm'</code>.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs">
                ✓ Com isso, a compilação do Vite roda lisa no runner do GitHub e publica o site automaticamente no GitHub Pages!
              </div>
            </div>
          </div>
        )}

        {/* Rodapé do Modal */}
        <div className="px-6 py-3 bg-[#141f35] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>DualDev • Academia Web de Programação</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
