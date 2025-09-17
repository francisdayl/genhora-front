const authState = '{"state":{"isAuthenticated":true,"user":{"email":"randomuser@espol.edu.ec","exp":2748993756,"generations":0}},"version":0}'

const subjects = {
    "ARTG2045": "APRECIACIÓN MUSICAL",
    "MEDG1015": "BIOGEOGRAFÍA",
    "ARQG2033": "ARQUEOLOGÍA DEL ECUADOR I",
    "MATG1070": "ANÁLISIS MATEMÁTICO I",
    "TURG2019": "ALIMENTOS Y BEBIDAS",
    "ELEG1028": "ANÁLISIS DE REDES ELÉCTRICAS",
    "ARQG2021": "ARQUEOLOGÍA DE MESOAMÉRICA",
    "ARTG2023": "ARTE Y CIENCIA",
    "DEPG2018": "BUCEO Y ACTIVIDADES NÁUTICAS",
    "ACUG1036": "ANÁLISIS DE DATOS ACUÍCOLAS",
    "MEDG1016": "BIOLOGÍA DE LA CONSERVACIÓN",
    "DIGG2040": "ANTROPOLOGÍA DEL DISEÑO",
    "ADSP2125": "ANÁLISIS DE DATOS APLICADOS A LA INGENIERÍA",
    "TURG2018": "AGENCIAS DE VIAJE",
    "MATG1065": "ANÁLISIS DISCRETO",
    "CCPG1059": "AUDITORÍA DE SISTEMAS DE INFORMACIÓN",
    "ARQG2025": "ARQUEOLOGÍA DEL ECUADOR II",
    "ADMG2022": "ADMINISTRACIÓN DE OPERACIONES",
    "MCTG1011": "ACTUADORES MECATRÓNICOS",
    "AUDG2031": "AUDITORÍA TRIBUTARIA",
    "ACUG1037": "BIENESTAR ANIMAL",
    "AUDG2029": "AUDITORÍA FORENSE",
    "MEDG1018": "BOTÁNICA SISTEMÁTICA",
    "MATG1803": "ÁLGEBRA LINEAL",
    "ARTG2035": "APRECIACIÓN CINEMATOGRÁFICA",
    "BIOG1024": "BIOQUÍMICA",
    "EYAG1027": "APLICACIONES ELECTRÓNICAS",
    "TLMG1022": "ADMINISTRACIÓN DE SISTEMAS Y SERVICIOS EN RED",
    "OCEG1029": "BIOGEOQUÍMICA MARINA",
    "MATG1076": "ANÁLISIS NUMÉRICO",
    "ARQG2031": "ARQUEOLOGÍA ANDINOAMERICANA",
    "INDG1060": "ADMINISTRACIÓN LOGÍSTICA",
    "ESTG1063": "BIOESTADÍSTICA",
    "BIOG1021": "BIOLOGÍA CELULAR Y MOLECULAR",
    "ARQG2034": "ARQUEOLOGÍA DEL VIEJO MUNDO",
    "QUIG1037": "BALANCE DE MATERIA Y ENERGÍA",
    "TLMG1023": "AMBIENTES INTELIGENTES",
    "MATG1066": "ÁLGEBRA LINEAL I",
    "ACUG1035": "ACUICULTURA ORNAMENTAL",
    "AUDG2026": "AUDITORÍA DE SISTEMAS INTEGRADOS",
    "INDG1059": "ATENCIÓN PLENA",
    "ARQG2022": "BIOARQUEOLOGÍA",
    "CADG2025": "ANIMACIÓN I",
    "AGRG1022": "AGRICULTURA DE PRECISIÓN",
    "ARQG2035": "ARQUEOLOGÍA SOCIAL LATINOAMERICANA",
    "AUDG2028": "AUDITORÍA FINANCIERA II",
    "BIOG1022": "BIOLOGÍA GENERAL",
    "INDG1034": "ANÁLISIS DE VALOR DE PRODUCTO",
    "CCPG1036": "ANÁLISIS DE ALGORITMOS",
    "ARTG2044": "ACTUACIÓN",
    "TLMG1024": "APLICACIONES MÓVILES Y SERVICIOS TELEMÁTICOS",
    "ECOG2042": "ANÁLISIS FINANCIERO",
    "ESTG1055": "APRENDIZAJE ESTADÍSTICO",
    "CIVG1034": "ANÁLISIS ESTRUCTURAL",
    "CADG2026": "ANIMACIÓN II",
    "ADMG2023": "ADMINISTRACIÓN DE LA INNOVACIÓN",
    "MATG1049": "ÁLGEBRA LINEAL",
    "MEDG2013": "ANÁLISIS NUTRICIONAL DE LOS ALIMENTOS",
    "AUDG2027": "AUDITORÍA FINANCIERA I",
    "ACUG1059": "BUENAS PRÁCTICAS EN ACUICULTURA",
    "MEDG1017": "BOTÁNICA GENERAL",
    "ALIG1029": "ANÁLISIS DE ALIMENTOS",
    "BIOG1030": "BIOINFORMÁTICA",
    "MATG1067": "ÁLGEBRA LINEAL II",
    "ALIG1030": "BIOQUÍMICA ALIMENTARIA",
    "ARQG2032": "ARQUEOLOGÍA DE LAS TIERRAS BAJAS DE SUDAMÉRICA Y DEL CARIBE",
    "AUDG2030": "AUDITORÍA OPERACIONAL",
    "MATG1079": "ANÁLISIS FUNCIONAL",
    "EYAG1028": "AUTOMATIZACIÓN DE PROCESOS INDUSTRIALES",
    "NUTG2026": "BIOÉTICA",
    "MTRG1023": "ANÁLISIS DE FALLAS Y SELECCIÓN DE MATERIALES",
    "ARQG2020": "ANTROPOLOGÍA BIOLÓGICA",
    "MEDG2012": "ANTROPOLOGÍA NUTRICIONAL",
    "MATG1078": "ANÁLISIS COMPLEJO",
    "INDG1033": "ANÁLISIS Y RESOLUCIÓN DE PROBLEMAS",
    "INDG1801": "ANÁLISIS Y RESOLUCIÓN DE PROBLEMAS",
    "MATG1071": "ANÁLISIS MATEMÁTICO II",
    "ARTG2024": "ARTE Y TECNOLOGÍA",
    "DEPG2017": "AJEDREZ"
}

describe('Genhora WorkFlow tests', () => {
  beforeEach(() => { 
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.localStorage.setItem('auth-storage', authState);
    });
  })

  it('Add Subjects Workflow', () => {
    cy.intercept('GET', '**/subjects', {
      statusCode: 200,
      body:subjects
    }).as('getSubjectsSucces');

    cy.visit("http://localhost:5173/")
    cy.get('[data-testid="sidebar-container"]').should('exist')
    cy.get('[data-testid="workflow-container"]').should('exist')

    cy.wait('@getSubjectsSucces').its('response.statusCode').should('eq', 200);
    cy.get('[data-testid="subject-input"]').type('ajedr');
    cy.get('[data-testid="subjects-result-container"]').children().should('have.length',1)
    cy.get('[data-testid="subjects-result-container"]').children().first().click()
    cy.get('[data-testid="sidebar-items-container"]').children().should('have.length',1)

    cy.get('[data-testid="subject-input"]').type('BIOG1022');
    cy.get('[data-testid="subjects-result-container"]').children().should('have.length',1)
    cy.get('[data-testid="subjects-result-container"]').children().first().click()
    cy.get('[data-testid="sidebar-items-container"]').children().should('have.length',2)

    cy.get('[data-testid="subject-input"]').type('PERRITO123');
    cy.get('[data-testid="subjects-result-container"]').children().should('have.length',1)
    cy.get('[data-testid="subjects-not-found"]').should('exist')

  })
 

})