module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "currentUser",
    ()=>currentUser,
    "documentosProc1",
    ()=>documentosProc1,
    "getDashboardStats",
    ()=>getDashboardStats,
    "getDocumentosByProcesso",
    ()=>getDocumentosByProcesso,
    "getNotasByProcesso",
    ()=>getNotasByProcesso,
    "getProcessoById",
    ()=>getProcessoById,
    "getTramitacoesByProcesso",
    ()=>getTramitacoesByProcesso,
    "notasProc1",
    ()=>notasProc1,
    "processos",
    ()=>processos,
    "secretarias",
    ()=>secretarias,
    "tramitacoesProc1",
    ()=>tramitacoesProc1
]);
const secretarias = [
    {
        id: "sec-1",
        nome: "Secretaria Municipal de Administracao",
        sigla: "SEMAD",
        responsavel: "Carlos Mendes"
    },
    {
        id: "sec-2",
        nome: "Secretaria Municipal de Educacao",
        sigla: "SEMED",
        responsavel: "Ana Paula Silva"
    },
    {
        id: "sec-3",
        nome: "Secretaria Municipal de Saude",
        sigla: "SEMUS",
        responsavel: "Dr. Roberto Lima"
    },
    {
        id: "sec-4",
        nome: "Secretaria Municipal de Infraestrutura",
        sigla: "SEMINFRA",
        responsavel: "Eng. Marcos Oliveira"
    },
    {
        id: "sec-5",
        nome: "Secretaria Municipal de Financas",
        sigla: "SEMFIN",
        responsavel: "Dra. Lucia Costa"
    }
];
const currentUser = {
    id: "user-1",
    name: "SEMIT",
    email: "semit@saoluis.ma.gov.br",
    role: "gestor",
    secretariaId: "sec-1",
    secretariaNome: "Secretaria Municipal de Administracao",
    avatar: undefined
};
const processos = [
    {
        id: "proc-1",
        numero: "2026.001.00234",
        tipo: "oficio",
        assunto: "Solicitacao de Recursos para Manutencao Predial",
        status: "em_andamento",
        dataCriacao: "2026-01-15T10:30:00Z",
        dataAtualizacao: "2026-02-08T14:20:00Z",
        secretariaOrigemId: "sec-1",
        secretariaOrigemNome: "Secretaria Municipal de Administracao",
        secretariaOrigemSigla: "SEMAD",
        criadorId: "user-1",
        criadorNome: "Maria Fernanda Alves",
        interessado: "Diretoria de Patrimonio",
        observacao: "Solicitacao urgente para manutencao do predio sede.",
        totalDocumentos: 4,
        totalTramitacoes: 3
    },
    {
        id: "proc-2",
        numero: "2026.001.00198",
        tipo: "memorando",
        assunto: "Alteracao de Horario de Expediente - Carnaval 2026",
        status: "concluido",
        dataCriacao: "2026-01-10T09:00:00Z",
        dataAtualizacao: "2026-01-28T16:45:00Z",
        secretariaOrigemId: "sec-1",
        secretariaOrigemNome: "Secretaria Municipal de Administracao",
        secretariaOrigemSigla: "SEMAD",
        criadorId: "user-1",
        criadorNome: "Maria Fernanda Alves",
        interessado: "Todas as Secretarias",
        totalDocumentos: 2,
        totalTramitacoes: 5
    },
    {
        id: "proc-3",
        numero: "2026.002.00412",
        tipo: "requerimento",
        assunto: "Contratacao de Professores Temporarios",
        status: "pendente",
        dataCriacao: "2026-02-01T11:15:00Z",
        dataAtualizacao: "2026-02-09T10:00:00Z",
        secretariaOrigemId: "sec-2",
        secretariaOrigemNome: "Secretaria Municipal de Educacao",
        secretariaOrigemSigla: "SEMED",
        criadorId: "user-3",
        criadorNome: "Pedro Henrique Santos",
        interessado: "Coord. de Ensino Fundamental",
        totalDocumentos: 6,
        totalTramitacoes: 2
    },
    {
        id: "proc-4",
        numero: "2026.003.00089",
        tipo: "parecer",
        assunto: "Aquisicao de Equipamentos Hospitalares",
        status: "em_andamento",
        dataCriacao: "2026-01-20T08:45:00Z",
        dataAtualizacao: "2026-02-07T11:30:00Z",
        secretariaOrigemId: "sec-3",
        secretariaOrigemNome: "Secretaria Municipal de Saude",
        secretariaOrigemSigla: "SEMUS",
        criadorId: "user-4",
        criadorNome: "Juliana Marques",
        interessado: "Hospital Municipal",
        totalDocumentos: 8,
        totalTramitacoes: 4
    },
    {
        id: "proc-5",
        numero: "2026.004.00156",
        tipo: "portaria",
        assunto: "Nomeacao de Comissao de Licitacao",
        status: "concluido",
        dataCriacao: "2026-01-05T14:00:00Z",
        dataAtualizacao: "2026-01-18T17:00:00Z",
        secretariaOrigemId: "sec-4",
        secretariaOrigemNome: "Secretaria Municipal de Infraestrutura",
        secretariaOrigemSigla: "SEMINFRA",
        criadorId: "user-5",
        criadorNome: "Ricardo Gomes",
        interessado: "Departamento de Compras",
        totalDocumentos: 3,
        totalTramitacoes: 6
    },
    {
        id: "proc-6",
        numero: "2026.005.00321",
        tipo: "nota_tecnica",
        assunto: "Analise de Impacto Orcamentario - Reajuste Salarial",
        status: "em_andamento",
        dataCriacao: "2026-02-03T10:00:00Z",
        dataAtualizacao: "2026-02-10T09:15:00Z",
        secretariaOrigemId: "sec-5",
        secretariaOrigemNome: "Secretaria Municipal de Financas",
        secretariaOrigemSigla: "SEMFIN",
        criadorId: "user-6",
        criadorNome: "Fernanda Costa",
        interessado: "Gabinete do Prefeito",
        totalDocumentos: 5,
        totalTramitacoes: 3
    },
    {
        id: "proc-7",
        numero: "2026.001.00267",
        tipo: "despacho",
        assunto: "Aprovacao de Ferias Coletivas - Dezembro 2026",
        status: "arquivado",
        dataCriacao: "2025-11-10T13:00:00Z",
        dataAtualizacao: "2025-12-20T16:30:00Z",
        secretariaOrigemId: "sec-1",
        secretariaOrigemNome: "Secretaria Municipal de Administracao",
        secretariaOrigemSigla: "SEMAD",
        criadorId: "user-1",
        criadorNome: "Maria Fernanda Alves",
        interessado: "Recursos Humanos",
        totalDocumentos: 2,
        totalTramitacoes: 4
    },
    {
        id: "proc-8",
        numero: "2026.001.00290",
        tipo: "decreto",
        assunto: "Regulamentacao do Teletrabalho no Servico Publico",
        status: "pendente",
        dataCriacao: "2026-02-05T09:30:00Z",
        dataAtualizacao: "2026-02-11T08:00:00Z",
        secretariaOrigemId: "sec-1",
        secretariaOrigemNome: "Secretaria Municipal de Administracao",
        secretariaOrigemSigla: "SEMAD",
        criadorId: "user-2",
        criadorNome: "Joao Carlos Ribeiro",
        interessado: "Todas as Secretarias",
        totalDocumentos: 7,
        totalTramitacoes: 1
    }
];
const documentosProc1 = [
    {
        id: "doc-1",
        processoId: "proc-1",
        titulo: "Oficio n. 234/2026 - Solicitacao de Recursos",
        tipo: "oficio",
        conteudo: "Senhor Secretario,\n\nVenho, por meio deste oficio, solicitar a alocacao de recursos financeiros no montante de R$ 150.000,00 (cento e cinquenta mil reais) para a realizacao de servicos de manutencao predial nas dependencias da sede desta Secretaria.\n\nAs instalacoes apresentam necessidade urgente de reparos na parte eletrica, hidraulica e na cobertura do edificio, conforme laudo tecnico anexo.\n\nSolicito a analise e providencias cabiveis.\n\nAtenciosamente,\nMaria Fernanda Alves\nDiretora de Administracao",
        dataCriacao: "2026-01-15T10:30:00Z",
        criadoPor: "Maria Fernanda Alves",
        assinaturas: [
            {
                id: "sig-1",
                documentoId: "doc-1",
                signatario: "Maria Fernanda Alves",
                cargo: "Diretora de Administracao",
                dataAssinatura: "2026-01-15T10:35:00Z",
                tipo: "digital",
                valida: true
            },
            {
                id: "sig-2",
                documentoId: "doc-1",
                signatario: "Carlos Mendes",
                cargo: "Secretario Municipal de Administracao",
                dataAssinatura: "2026-01-15T14:00:00Z",
                tipo: "digital",
                valida: true
            }
        ],
        anexos: [
            {
                id: "anx-1",
                documentoId: "doc-1",
                nome: "Laudo_Tecnico_Manutencao.pdf",
                tipo: "application/pdf",
                tamanho: "2.4 MB",
                dataUpload: "2026-01-15T10:28:00Z"
            },
            {
                id: "anx-2",
                documentoId: "doc-1",
                nome: "Fotos_Instalacoes.zip",
                tipo: "application/zip",
                tamanho: "15.7 MB",
                dataUpload: "2026-01-15T10:29:00Z"
            }
        ]
    },
    {
        id: "doc-2",
        processoId: "proc-1",
        titulo: "Parecer Tecnico n. 045/2026",
        tipo: "parecer",
        conteudo: "Parecer referente a solicitacao de recursos para manutencao predial.\n\nApos vistoria realizada in loco, confirma-se a necessidade dos reparos solicitados. O orcamento apresentado esta compativel com os valores praticados no mercado.\n\nParecer favoravel a aprovacao dos recursos solicitados.",
        dataCriacao: "2026-01-22T15:00:00Z",
        criadoPor: "Eng. Paulo Roberto",
        assinaturas: [
            {
                id: "sig-3",
                documentoId: "doc-2",
                signatario: "Eng. Paulo Roberto",
                cargo: "Engenheiro Civil - SEMINFRA",
                dataAssinatura: "2026-01-22T15:10:00Z",
                tipo: "digital",
                valida: true
            }
        ],
        anexos: [
            {
                id: "anx-3",
                documentoId: "doc-2",
                nome: "Planilha_Orcamento.xlsx",
                tipo: "application/xlsx",
                tamanho: "485 KB",
                dataUpload: "2026-01-22T15:05:00Z"
            }
        ]
    },
    {
        id: "doc-3",
        processoId: "proc-1",
        titulo: "Despacho n. 112/2026 - Aprovacao Parcial",
        tipo: "despacho",
        conteudo: "Aprovo parcialmente a solicitacao, autorizando a liberacao de R$ 100.000,00 para inicio imediato dos servicos mais urgentes (parte eletrica e hidraulica).\n\nA analise do restante dos recursos ficara condicionada a disponibilidade orcamentaria do proximo trimestre.",
        dataCriacao: "2026-02-01T11:00:00Z",
        criadoPor: "Dra. Lucia Costa",
        assinaturas: [
            {
                id: "sig-4",
                documentoId: "doc-3",
                signatario: "Dra. Lucia Costa",
                cargo: "Secretaria Municipal de Financas",
                dataAssinatura: "2026-02-01T11:15:00Z",
                tipo: "digital",
                valida: true
            }
        ],
        anexos: []
    },
    {
        id: "doc-4",
        processoId: "proc-1",
        titulo: "Memorando n. 078/2026 - Ciencia e Providencias",
        tipo: "memorando",
        conteudo: "Para conhecimento e providencias cabiveis quanto ao inicio dos servicos de manutencao predial aprovados.",
        dataCriacao: "2026-02-05T09:00:00Z",
        criadoPor: "Maria Fernanda Alves",
        assinaturas: [
            {
                id: "sig-5",
                documentoId: "doc-4",
                signatario: "Maria Fernanda Alves",
                cargo: "Diretora de Administracao",
                dataAssinatura: "2026-02-05T09:10:00Z",
                tipo: "digital",
                valida: true
            }
        ],
        anexos: []
    }
];
const tramitacoesProc1 = [
    {
        id: "tram-1",
        processoId: "proc-1",
        setorOrigemNome: "Secretaria Municipal de Administracao",
        setorOrigemSigla: "SEMAD",
        setorDestinoNome: "Secretaria Municipal de Infraestrutura",
        setorDestinoSigla: "SEMINFRA",
        dataEnvio: "2026-01-16T08:00:00Z",
        dataRecebimento: "2026-01-16T10:30:00Z",
        despacho: "Encaminho para parecer tecnico sobre viabilidade e orcamento.",
        responsavel: "Maria Fernanda Alves",
        status: "recebido"
    },
    {
        id: "tram-2",
        processoId: "proc-1",
        setorOrigemNome: "Secretaria Municipal de Infraestrutura",
        setorOrigemSigla: "SEMINFRA",
        setorDestinoNome: "Secretaria Municipal de Financas",
        setorDestinoSigla: "SEMFIN",
        dataEnvio: "2026-01-23T09:00:00Z",
        dataRecebimento: "2026-01-23T14:00:00Z",
        despacho: "Parecer favoravel emitido. Encaminho para analise financeira.",
        responsavel: "Eng. Paulo Roberto",
        status: "recebido"
    },
    {
        id: "tram-3",
        processoId: "proc-1",
        setorOrigemNome: "Secretaria Municipal de Financas",
        setorOrigemSigla: "SEMFIN",
        setorDestinoNome: "Secretaria Municipal de Administracao",
        setorDestinoSigla: "SEMAD",
        dataEnvio: "2026-02-01T14:00:00Z",
        dataRecebimento: "2026-02-01T16:00:00Z",
        despacho: "Aprovacao parcial concedida. Recursos liberados conforme despacho.",
        responsavel: "Dra. Lucia Costa",
        status: "recebido"
    }
];
const notasProc1 = [
    {
        id: "nota-1",
        processoId: "proc-1",
        autor: "Maria Fernanda Alves",
        conteudo: "Verificar com o departamento de compras se ja existe ata de registro de precos para servicos de manutencao predial.",
        dataCriacao: "2026-01-15T11:00:00Z",
        privada: false
    },
    {
        id: "nota-2",
        processoId: "proc-1",
        autor: "Carlos Mendes",
        conteudo: "Priorizar a manutencao eletrica. Houve relato de curto-circuito no 3o andar na semana passada.",
        dataCriacao: "2026-01-17T09:30:00Z",
        privada: true
    },
    {
        id: "nota-3",
        processoId: "proc-1",
        autor: "Maria Fernanda Alves",
        conteudo: "Recursos parciais liberados. Iniciar processo de contratacao dos servicos urgentes.",
        dataCriacao: "2026-02-02T10:00:00Z",
        privada: false
    }
];
function getProcessoById(id) {
    return processos.find((p)=>p.id === id);
}
function getDocumentosByProcesso(processoId) {
    if (processoId === "proc-1") return documentosProc1;
    return [];
}
function getTramitacoesByProcesso(processoId) {
    if (processoId === "proc-1") return tramitacoesProc1;
    return [];
}
function getNotasByProcesso(processoId) {
    if (processoId === "proc-1") return notasProc1;
    return [];
}
function getDashboardStats() {
    return {
        totalProcessos: processos.length,
        emAndamento: processos.filter((p)=>p.status === "em_andamento").length,
        concluidos: processos.filter((p)=>p.status === "concluido").length,
        pendentes: processos.filter((p)=>p.status === "pendente").length,
        processosRecentes: processos.slice(0, 5).map(toResumo),
        tramitacoesRecentes: tramitacoesProc1.slice(0, 3)
    };
}
function toResumo(p) {
    return {
        id: p.id,
        numero: p.numero,
        tipo: p.tipo,
        assunto: p.assunto,
        status: p.status,
        dataCriacao: p.dataCriacao,
        secretariaOrigemSigla: p.secretariaOrigemSigla,
        interessado: p.interessado,
        totalDocumentos: p.totalDocumentos,
        totalTramitacoes: p.totalTramitacoes
    };
}
}),
"[project]/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/badge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/app/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-rsc] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-rsc] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-rsc] (ecmascript) <export default as AlertCircle>");
;
;
;
;
function DashboardPage() {
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDashboardStats"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 lg:p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex items-center gap-2 text-sm text-muted-foreground mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Painel"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-foreground",
                        children: "Painel"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: "Visao geral do sistema de processos"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                        label: "Total de Processos",
                        value: stats.totalProcessos,
                        color: "text-sidebar-primary"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
                        label: "Em Andamento",
                        value: stats.emAndamento,
                        color: "text-emerald-400"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
                        label: "Concluidos",
                        value: stats.concluidos,
                        color: "text-sky-400"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
                        label: "Pendentes",
                        value: stats.pendentes,
                        color: "text-amber-400"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-border bg-card p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-semibold text-foreground mb-4",
                        children: "Processos Recentes"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: stats.processosRecentes.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between py-2 border-b border-border last:border-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-mono font-semibold text-sidebar-primary",
                                                children: p.numero
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 35,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground truncate",
                                                children: p.assunto
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 36,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        className: "text-[10px] shrink-0 ml-4",
                                        children: p.secretariaOrigemSigla
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, p.id, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function StatCard({ icon: Icon, label, value, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-border bg-card p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${color}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-2xl font-bold text-foreground",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/page.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__841adc1f._.js.map