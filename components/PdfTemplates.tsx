import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import Html from 'react-pdf-html'
import { ProcessoTree, Anexo, SubDoc } from "./types"

// Estilos para os componentes nativos do PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 11 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 10 },
  heading: { fontSize: 12, fontFamily: "Helvetica-Bold", marginTop: 15, marginBottom: 5 },
  text: { marginBottom: 4, lineHeight: 1.4, textAlign: 'justify' },
  divider: { borderBottomWidth: 1, borderBottomColor: "#cccccc", marginVertical: 15 },
  listItem: { flexDirection: "row", marginBottom: 3 },
  bullet: { width: 10, fontSize: 10 },
  itemContent: { flex: 1 },
  subdocContainer: { marginTop: 10, marginBottom: 10 },
  italicText: { fontFamily: "Helvetica-Oblique" },
})

// Estilos específicos para converter o HTML (Tabelas, negritos, etc)
const htmlStyles = {
  // Força o tamanho da fonte em todas as tags comuns para 11 (igual ao seu original)
  body: { fontSize: 11, fontFamily: 'Helvetica' },
  p: { fontSize: 11, marginBottom: 4 },
  span: { fontSize: 11 },
  // Remove o azul e o sublinhado dos links
  a: { color: '#000000', textDecoration: 'none' },
  // Garante que o negrito funcione sem aumentar o tamanho
  strong: { fontFamily: 'Helvetica-Bold' },
  b: { fontFamily: 'Helvetica-Bold' },
  // Tabelas compactas
  table: { width: '100%', border: '0.5pt solid #ccc', marginVertical: 10 },
  td: { padding: 4, border: '0.5pt solid #ccc', fontSize: 10 },
  tr: { flexDirection: 'row' },
};
// Template para PDF Simples
export const SimplePdfTemplate = ({ title, content }: { title: string, content: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ marginTop: 10 }}>
        <Html stylesheet={htmlStyles}>{content || "Sem conteúdo disponível"}</Html>
      </View>
    </Page>
  </Document>
)

// Template Completo para o Processo
export const ProcessoPdfTemplate = ({ tree }: { tree: ProcessoTree }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* Cabeçalho */}
      <Text style={styles.title}>Processo {tree.numero}</Text>
      <Text style={styles.text}>Tipo: {tree.tipo}</Text>
      <Text style={styles.text}>Assunto: {tree.assunto}</Text>
      <Text style={styles.text}>Setor Origem: {tree.setorOrigem} - {tree.setorOrigemNome}</Text>
      <Text style={styles.text}>Criador: {tree.criador}</Text>
      <Text style={styles.text}>Data: {tree.data} {tree.hora}</Text>

      {/* Conteúdo do Processo */}
      {tree.conteudo && (
        <View wrap={false} style={{ marginTop: 10 }}>
          <Text style={styles.heading}>Conteúdo do Processo:</Text>
          <Html stylesheet={htmlStyles}>{tree.conteudo}</Html>
        </View>
      )}

      {/* Anexos do Processo */}
      {tree.anexos && tree.anexos.length > 0 && (
        <View wrap={false}>
          <Text style={styles.heading}>Anexos ({tree.anexos.length}):</Text>
          {tree.anexos.map((anexo: Anexo, i: number) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>-</Text>
              <Text style={styles.itemContent}>{anexo.nome}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Subdocumentos */}
      {tree.subdocs && tree.subdocs.length > 0 && (
        <View>
          {tree.subdocs.map((subdoc: SubDoc, index: number) => (
            <View key={index} style={styles.subdocContainer} wrap={false}>
              <View style={styles.divider} />
              <Text style={[styles.heading, { marginTop: 0 }]}>
                Documento: {subdoc.numero || subdoc.codigo || subdoc.id}
              </Text>
              <Text style={styles.text}>Setor: {subdoc.setorOrigem} | Criador: {subdoc.criador}</Text>
              <Text style={styles.text}>Data: {subdoc.data} {subdoc.hora}</Text>
              
              {subdoc.conteudo && (
                <View style={{ marginTop: 8 }}>
                   <Html stylesheet={htmlStyles}>{subdoc.conteudo}</Html>
                </View>
              )}

              {subdoc.anexos && subdoc.anexos.length > 0 && (
                <Text style={[styles.text, styles.italicText, { marginTop: 8, fontSize: 9 }]}>
                  Anexos: {subdoc.anexos.map(a => a.nome).join(", ")}
                </Text>
              )}

              {subdoc.assinaturas && subdoc.assinaturas.length > 0 && (
                <Text style={[styles.text, styles.italicText, { marginTop: 2, fontSize: 9 }]}>
                  Assinaturas: {subdoc.assinaturas.map(a => a.signatario).join(", ")}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
)