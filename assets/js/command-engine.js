import { signOut } from "./auth.js";
import {
    getDossierByReference,
    getNextDossier,
    updateRappelDossier,
    updateStatutDossier,
    getTachesDuJour,
    getDossierStats,
    updateDossierComplet,
    updateNumeroFactureDossier,
    getListeDossiers,
    createDossierComplet,
    dossierReferenceExists,
    getDossiersByGroupId,
    findGroupCandidates,
    grouperDossiers,
    degrouperDossier
} from "./dossiers.js";
import { getHistoriqueByDossier, addHistorique, addHistoriqueGroupe, deleteHistorique } from "./historique.js";
import {
    createPromesse,
    getPromessesByDossier,
    getPromesseActive,
    updatePromesseStatut,
    getPromessesAControler
} from "./promesses.js";
import {
    createPaiement,
    getPaiementsByDossier,
    updatePaiement,
    deletePaiement
} from "./paiements.js";
import { getRapprochementsCentralPay, imputerRapprochementCentralPay } from "./rapprochements.js";
import {
    COURRIER_TYPES,
    preparerCourrier,
    preparerCourrierGroupe,
    ouvrirApercuCourrier,
    transmettreCourrierPingen
} from "./courriers.js";
import {
    getEcheancierDossier,
    getEcheancierActif,
    createEcheancier,
    annulerEcheancier,
    affecterPaiementAuxEcheances,
    recalculerAffectationsEcheancier,
    synchroniserRappelEcheancier,
    getEcheancesImpayees
} from "./echeanciers.js";
import { calculerSituationFinanciere } from "./calculs.js";
import { getTousTauxInteretsLegaux, validerTauxPeriode } from "./taux-interets.js";
import { renderDossierScreen } from "./screens/dossier-screen.js";
import { renderComptaScreen } from "./screens/compta-screen.js";
import { renderRappelForm } from "./screens/forms/rappel-form.js";
import { renderPromesseForm } from "./screens/forms/promesse-form.js";
import { renderTachesScreen } from "./screens/taches-screen.js";
import { renderLstScreen } from "./screens/lst-screen.js";
import { renderHistoriqueScreen } from "./screens/historique-screen.js";
import { renderPaiementForm } from "./screens/forms/paiement-form.js";
import { renderInteretsScreen } from "./screens/interets-screen.js";
import { getRemisesByDossier, createRemise, annulerRemise } from "./remises.js";
import { openRemiseForm } from "./screens/forms/remise-form.js";
import { renderRemisesScreen } from "./screens/remises-screen.js";
import { openModdosForm } from "./screens/forms/moddos-form.js";
import { openAddDossierForm } from "./screens/forms/addos-form.js";
import { renderEcheancierScreen } from "./screens/echeancier-screen.js";
import { openAddEcheancierForm } from "./screens/forms/addech-form.js";
import { openEcheancierPayForm } from "./screens/forms/echeancier-pay-form.js";
import { openAnnulEcheancierForm } from "./screens/forms/echeancier-annul-form.js";
import { openDelPaiementForm } from "./screens/forms/delpay-form.js";
import {
    openModPaiementSelectionForm,
    openModPaiementForm
} from "./screens/forms/modpay-form.js";
import { openDelHistoriqueForm } from "./screens/forms/delhis-form.js";
import { openDelDossierForm } from "./screens/forms/deldos-form.js";
import { supprimerDossierTest } from "./suppression-dossiers.js";
import {
    getClients,
    getClientByReference,
    createClient,
    updateClient,
    deleteClient,
    getDossiersByClient
} from "./clients.js";
import { renderClientsScreen } from "./screens/clients-screen.js";
import { renderClientScreen } from "./screens/client-screen.js";
import { renderClientDossiersScreen } from "./screens/client-dossiers-screen.js";
import { openClientForm } from "./screens/forms/client-form.js";
import { openDelClientForm } from "./screens/forms/delcli-form.js";
import { parseImportPaiCsv } from "./importpai.js";
import {
    renderImportPaiUploadScreen,
    renderImportPaiPreviewScreen,
    renderImportPaiResultScreen
} from "./screens/importpai-screen.js";
import { parseImportDosCsv } from "./importdos.js";
import {
    renderImportDosUploadScreen,
    renderImportDosPreviewScreen,
    renderImportDosResultScreen
} from "./screens/importdos-screen.js";
import {
    getTarifs,
    getTarifByCode,
    getTarifById,
    getTarifsActifs,
    createTarif,
    updateTarif,
    disableTarif,
    getPaliersByTarifCode,
    getPalierByTarifCodeAndOrdre,
    createPalierTarif,
    updatePalierTarif,
    deletePalierTarif
} from "./tarifs.js";
import { renderTarifsScreen } from "./screens/tarifs-screen.js";
import { renderTarifPaliersScreen } from "./screens/tarif-paliers-screen.js";
import { openTarifForm } from "./screens/forms/tarif-form.js";
import { openDelTarifForm } from "./screens/forms/deltar-form.js";
import { openTarifPalierForm } from "./screens/forms/tarif-palier-form.js";
import { openDelPalierForm } from "./screens/forms/delpal-form.js";
import {
    getHonorairesByDossier,
    calculerEtCreerHonorairePaiement,
    supprimerHonorairesParPaiement
} from "./honoraires.js";
import { renderHonorairesScreen } from "./screens/honoraires-screen.js";
import {
    getFraisByDossier,
    getFraisById,
    createFraisDossier,
    updateFraisDossier,
    deleteFraisDossier
} from "./frais.js";
import { renderFraisScreen } from "./screens/frais-screen.js";
import {
    openFraisForm,
    openFraisSelectionForm
} from "./screens/forms/frais-form.js";
import { openDelFraisForm } from "./screens/forms/delfrais-form.js";
import {
    getClientsAFacturer,
    getFacturationClient,
    validerFacturationClient,
    renvoyerFactureClient,
    getEtatCompteMensuel,
    getEtatCompteClientMensuel
} from "./facturation.js";
import { renderFacturesScreen } from "./screens/factures-screen.js";
import { renderFactCliScreen } from "./screens/factcli-screen.js";
import { renderEcMensScreen } from "./screens/ecmens-screen.js";
import { renderEcFactScreen } from "./screens/ecfact-screen.js";
import { openEcFactPdf } from "./pdf/ecfact-pdf.js";
import { getDashboardData } from "./dashboard.js";
import { renderDashboardScreen } from "./screens/dashboard-screen.js";
import { getReversementsAEffectuer, getReversementsHistorique, validerReversement, grouperReversementsParClient, validerReversementClient } from "./reversements.js";
import { renderReversementsScreen, renderReversementsHistoriqueScreen, renderReversementsClientsScreen } from "./screens/reversements-screen.js";

import {
    getHuissiers,
    getHuissierByReference,
    createHuissier,
    updateHuissier,
    deleteHuissier
} from "./huissiers.js";
import { renderHuissiersScreen } from "./screens/huissiers-screen.js";
import { renderHuissierScreen } from "./screens/huissier-screen.js";
import { openHuissierForm } from "./screens/forms/huissier-form.js";
import { openDelHuissierForm } from "./screens/forms/delhui-form.js";

import {
    getTribunaux,
    getTribunalByReference,
    getTribunauxActifs,
    createTribunal,
    updateTribunal,
    deleteTribunal
} from "./tribunaux.js";
import { renderTribunauxScreen } from "./screens/tribunaux-screen.js";
import { renderTribunalScreen } from "./screens/tribunal-screen.js";
import { openTribunalForm } from "./screens/forms/tribunal-form.js";
import { openDelTribunalForm } from "./screens/forms/deltrib-form.js";

import {
    getAvocats,
    getAvocatByReference,
    getAvocatsActifs,
    createAvocat,
    updateAvocat,
    deleteAvocat
} from "./avocats.js";
import { renderAvocatsScreen } from "./screens/avocats-screen.js";
import { renderAvocatScreen } from "./screens/avocat-screen.js";
import { openAvocatForm } from "./screens/forms/avocat-form.js";
import { openDelAvocatForm } from "./screens/forms/delavo-form.js";
import {
    getContentieuxByDossier,
    createContentieuxDossier,
    updateContentieuxDossier,
    cloturerContentieuxDossier
} from "./contentieux.js";
import { renderContentieuxScreen } from "./screens/contentieux-screen.js";
import { openContentieuxForm } from "./screens/forms/contentieux-form.js";
import {
    getJudiciaireByDossier,
    createJudiciaireDossier,
    updateJudiciaireDossier
} from "./judiciaire.js";
import { renderJudiciaireScreen } from "./screens/judiciaire-screen.js";
import { openJudiciaireForm } from "./screens/forms/judiciaire-form.js";
import {
    getSmsModeles,
    getSmsModeleByCode,
    getSmsModelesActifs,
    createSmsModele,
    updateSmsModele,
    disableSmsModele,
    buildSmsMessage,
    smsModeleUtiliseLienPaiement,
    createCentralPayLink,
    sendSmsDossier
} from "./sms.js";
import { renderSmsTypesScreen } from "./screens/sms-types-screen.js";
import { openSmsModeleForm } from "./screens/forms/sms-modele-form.js";
import { openDelSmsModeleForm } from "./screens/forms/delsms-form.js";
import {
    openSmsSelectionForm,
    openSmsPreviewForm
} from "./screens/forms/sms-send-form.js";
import { lancerAppelAutomatiqueMailingVox } from "./calla.js";
import { openCallaForm } from "./screens/forms/calla-form.js";
import { openGroupScopeForm } from "./screens/forms/group-scope-form.js";
import { buildGroupActionContext } from "./group-action.js";
import { openCallaGroupForm } from "./screens/forms/callag-form.js";
import { preparerCallaGroup, executerCallaGroup, getPendingCallaGroup, clearPendingCallaGroup } from "./calla-group.js";
import {
    getEmailModeles,
    getEmailModeleByCode,
    getEmailProfessionnelModeleByCode,
    createEmailModele,
    updateEmailModele,
    disableEmailModele,
    buildEmailPayload,
    buildEmailProfessionnelPayload,
    sendEmailDossier,
    sendEmailProfessionnelDossier
} from "./emails.js";
import { renderEmailTypesScreen } from "./screens/email-types-screen.js";
import { openEmailModeleForm } from "./screens/forms/email-modele-form.js";
import { openDelEmailModeleForm } from "./screens/forms/delemail-form.js";
import { openEmailDirectForm } from "./screens/forms/email-direct-form.js";
import { openEmailPreviewForm } from "./screens/forms/email-send-form.js";
import {
    getTachesMetier,
    getTachesMetierFutures,
    getTachesMetierRetard,
    synchroniserTachesJudiciaires
} from "./taches.js";

let pendingImportPai = null;
let pendingImportDos = null;
let currentTarifPaliersCode = null;
let currentEcMensPeriod = null;
let currentEcFactParams = null;
let currentEcFactData = null;

async function getTarifOptions() {
    const result = await getTarifsActifs();

    if (result.error) {
        return { options: [], error: result.error };
    }

    return {
        options: (result.data || []).map((tarif) => tarif.code_tarif),
        error: null
    };
}

async function getTarifCodeById(tarifId) {
    if (!tarifId) {
        return "";
    }

    const result = await getTarifById(tarifId);

    if (result.error || !result.data) {
        return "";
    }

    return result.data.code_tarif || "";
}

async function getHuissierOptions() {
    const result = await getHuissiers(1, 200);

    if (result.error) {
        return { options: [], error: result.error };
    }

    return {
        options: (result.data || [])
            .filter((huissier) => huissier.actif !== false)
            .map((huissier) => huissier.reference_huissier),
        error: null
    };
}

async function getTribunalOptions() {
    const result = await getTribunauxActifs(9);

    if (result.error) {
        return { options: [], error: result.error };
    }

    return {
        options: (result.data || [])
            .filter((tribunal) => tribunal.actif !== false)
            .map((tribunal) => tribunal.reference_tribunal),
        error: null
    };
}

async function getAvocatOptions() {
    const result = await getAvocatsActifs(9);

    if (result.error) {
        return { options: [], error: result.error };
    }

    return {
        options: (result.data || [])
            .filter((avocat) => avocat.actif !== false)
            .map((avocat) => avocat.reference_avocat),
        error: null
    };
}


export async function executeCommand(rawCommand, context) {
    const parts = rawCommand.trim().split(/\s+/);
    const command = (parts[0] || "").toUpperCase();
    const args = parts.slice(1);

    if (!command) return;

    switch (command) {
        case "HELP": context.resetPage("help"); renderHelp(context, 1); break;
        case "HELPNEXT": renderHelp(context, context.getPage("help") + 1); break;
        case "HELPPREV": renderHelp(context, context.getPage("help") - 1); break;
        case "MENU": context.resetPage("menu"); renderMenu(context, 1); break;
        case "MENUNEXT": renderMenu(context, context.getPage("menu") + 1); break;
        case "MENUPREV": renderMenu(context, context.getPage("menu") - 1); break;
        case "CLS": context.screen.innerHTML = ""; break;
        case "DASH": await handleDash(context); break;
        case "HUISSIERS": await handleHuissiers(context); break;
        case "HUNEXT": await handleHuissiersNext(context); break;
        case "HUPREV": await handleHuissiersPrev(context); break;
        case "HUI": await handleHuissier(args, context); break;
        case "ADDHUI": await handleAddHuissier(context); break;
        case "MODHUI": await handleModHuissier(args, context); break;
        case "DELHUI": await handleDelHuissier(args, context); break;
        case "TRIBUNAUX": await handleTribunaux(context); break;
        case "TRIBNEXT": await handleTribunauxNext(context); break;
        case "TRIBPREV": await handleTribunauxPrev(context); break;
        case "TRIB": await handleTribunal(args, context); break;
        case "ADDTRIB": await handleAddTribunal(context); break;
        case "MODTRIB": await handleModTribunal(args, context); break;
        case "DELTRIB": await handleDelTribunal(args, context); break;
        case "AVOCATS": await handleAvocats(context); break;
        case "AVONEXT": await handleAvocatsNext(context); break;
        case "AVOPREV": await handleAvocatsPrev(context); break;
        case "AVO": await handleAvocat(args, context); break;
        case "ADDAVO": await handleAddAvocat(context); break;
        case "MODAVO": await handleModAvocat(args, context); break;
        case "DELAVO": await handleDelAvocat(args, context); break;
        case "SMSTYPES": await handleSmsTypes(context); break;
        case "SMNEXT": await handleSmsTypesNext(context); break;
        case "SMPREV": await handleSmsTypesPrev(context); break;
        case "ADDSMS": await handleAddSmsModele(context); break;
        case "MODSMS": await handleModSmsModele(args, context); break;
        case "DELSMS": await handleDelSmsModele(args, context); break;
        case "SMS": await handleSms(context); break;
        case "CB": await handleCb(args, context); break;
        case "RAPP": await handleRapp(context); break;
        case "COUR": await handleCour(context); break;
        case "MAILTYPES": await handleEmailTypes(context); break;
        case "MAILNEXT": await handleEmailTypesNext(context); break;
        case "MAILPREV": await handleEmailTypesPrev(context); break;
        case "ADDMAIL": await handleAddEmailModele(context); break;
        case "MODMAIL": await handleModEmailModele(args, context); break;
        case "DELMAIL": await handleDelEmailModele(args, context); break;
        case "MAIL": await handleMail(args, context); break;
        case "MAILCLI": await handleMailProfessionnel(args, context, "CLIENT"); break;
        case "MAILHUI": await handleMailProfessionnel(args, context, "HUISSIER"); break;
        case "MAILAVO": await handleMailProfessionnel(args, context, "AVOCAT"); break;
        case "CONT": await handleContentieux(context); break;
        case "ADDCONT": await handleAddContentieux(context); break;
        case "MODCONT": await handleModContentieux(context); break;
        case "CONTIRR": await handleClotureContentieux(context, "IRRECOUVRABLE"); break;
        case "CONTJUD": await handleClotureContentieux(context, "JUDICIAIRE"); break;
        case "JUD": await handleJudiciaire(context); break;
        case "ADDJUD": await handleAddJudiciaire(context); break;
        case "MODJUD": await handleModJudiciaire(context); break;
        case "IMPORTPAI": await handleImportPai(context); break;
        case "IMPORTPAIVALID": await handleImportPaiValid(context); break;
        case "IMPORTPAICANCEL": await handleImportPaiCancel(context); break;
        case "IMPORTDOS": await handleImportDos(context); break;
        case "IMPORTDOSVALID": await handleImportDosValid(context); break;
        case "IMPORTDOSCANCEL": await handleImportDosCancel(context); break;
        case "TARIFS": await handleTarifs(context); break;
        case "TARNEXT": await handleTarifsNext(context); break;
        case "TARPREV": await handleTarifsPrev(context); break;
        case "ADDTAR": await handleAddTarif(context); break;
        case "MODTAR": await handleModTarif(args, context); break;
        case "DELTAR": await handleDelTarif(args, context); break;
        case "TARPAL": await handleTarifPaliers(args, context); break;
        case "PALNEXT": await handleTarifPaliersNext(context); break;
        case "PALPREV": await handleTarifPaliersPrev(context); break;
        case "ADDPAL": await handleAddPalier(args, context); break;
        case "MODPAL": await handleModPalier(args, context); break;
        case "DELPAL": await handleDelPalier(args, context); break;
        case "TACHES": await handleTaches(context); break;
        case "TACHESFUT": await handleTachesFutures(context); break;
        case "TACHESRETARD": await handleTachesRetard(context); break;
        case "TFNEXT": await handleTachesFuturesNext(context); break;
        case "TFPREV": await handleTachesFuturesPrev(context); break;
        case "TRNEXT": await handleTachesRetardNext(context); break;
        case "TRPREV": await handleTachesRetardPrev(context); break;
        case "LST": await handleListeDossiers(context); break;
        case "LNEXT": await handleListeDossiersNext(context); break;
        case "LPREV": await handleListeDossiersPrev(context); break;
        case "CLIENTS": await handleClients(context); break;
        case "CLNEXT": await handleClientsNext(context); break;
        case "CLPREV": await handleClientsPrev(context); break;
        case "CLI": await handleClient(args, context); break;
        case "CLIDOS": await handleClientDossiers(args, context); break;
        case "CDNEXT": await handleClientDossiersNext(context); break;
        case "CDPREV": await handleClientDossiersPrev(context); break;
        case "ADDCLI": await handleAddClient(args, context); break;
        case "MODCLI": await handleModClient(args, context); break;
        case "DELCLI": await handleDelClient(args, context); break;
        case "TNEXT": await handleTachesNext(context); break;
        case "TPREV": await handleTachesPrev(context); break;
        case "NEXT": await handleNext(context); break;
        case "DOS": await handleDos(args, context); break;
        case "GROUPE": await handleGroupe(context); break;
        case "GROUPER": await handleGrouper(args, context); break;
        case "DEGROUPER": await handleDegrouper(args, context); break;
        case "DELDOS": await handleDelDossier(args, context); break;
        case "ADDOS": await handleAddDossier(context); break;
        case "MODDOS": await handleModdos(context); break;
        case "FACTURE": await handleFacture(args, context); break;
        case "STATUT": await handleStatut(args, context); break;
        case "ECH": await handleEcheancier(context); break;
        case "ENEXT": await handleEcheancierNext(context); break;
        case "EPREV": await handleEcheancierPrev(context); break;
        case "ADDECH": await handleAddEcheancier(context); break;
        case "MODECH": await handleModifEcheancier(context); break;
        case "ECHANNUL": await handleAnnulEcheancier(context); break;
        case "ECHPAY": await handlePayEcheancier(context); break;
        case "HIS": await handleHis(context); break;
        case "HNEXT": await handleHisNext(context); break;
        case "HPREV": await handleHisPrev(context); break;
        case "DELHIS": await handleDelHis(context); break;
        case "CALL": await handleCall(args, context); break;
        case "CALLA": await handleCalla(context); break;
        case "CALLAG": await handleCallaGroup(context); break;
        case "CALLAGVAL": await handleCallaGroupVal(context); break;
        case "CALLAGANNUL": await handleCallaGroupAnnul(context); break;
        case "NOTE": await handleNote(args, context); break;
        case "COMPTA": await handleCompta(context); break;
        case "REM": await handleRemise(context); break;
        case "REMLIST": await handleRemList(context); break;
        case "REMANNUL": await handleRemAnnul(args, context); break;
        case "CNEXT": await handleComptaNext(context); break;
        case "CPREV": await handleComptaPrev(context); break;
        case "INTDET": await handleIntDet(context); break;
        case "TAUX": await handleTaux(context); break;
        case "TAUXVAL": await handleTauxVal(args, context); break;
        case "HON": await handleHonoraires(context); break;
        case "HONNEXT": await handleHonorairesNext(context); break;
        case "HONPREV": await handleHonorairesPrev(context); break;
        case "FRAIS": await handleFrais(context); break;
        case "FRNEXT": await handleFraisNext(context); break;
        case "FRPREV": await handleFraisPrev(context); break;
        case "ADDFRAIS": await handleAddFrais(context); break;
        case "MODFRAIS": await handleModFrais(context); break;
        case "DELFRAIS": await handleDelFrais(context); break;
        case "FACTURES": await handleFactures(context); break;
        case "FACTNEXT": await handleFacturesNext(context); break;
        case "FACTPREV": await handleFacturesPrev(context); break;
        case "FACTCLI": await handleFactCli(args, context); break;
        case "FCNEXT": await handleFactCliNext(context); break;
        case "FCPREV": await handleFactCliPrev(context); break;
        case "FACTVAL": await handleFactVal(context); break;
        case "FACTMAIL": await handleFactMail(context); break;
        case "ECMENS": await handleEcMens(args, context); break;
        case "ECNEXT": await handleEcMensNext(context); break;
        case "ECPREV": await handleEcMensPrev(context); break;
        case "ECFACT": await handleEcFact(args, context); break;
        case "EFNEXT": await handleEcFactNext(context); break;
        case "EFPREV": await handleEcFactPrev(context); break;
        case "ECFACTPDF": await handleEcFactPdf(context); break;
        case "INEXT": await handleIntDetNext(context); break;
        case "IPREV": await handleIntDetPrev(context); break;
        case "RAPPEL": await handleRappelForm(context); break;
        case "RAPPELVALID": await handleRappel(args, context); break;
        case "PROM": await handlePromForm(context); break;
        case "PROMVALID": await handleProm(args, context); break;
        case "PROMLIST": await handlePromList(context); break;
        case "PAY": await handlePayForm(context); break;
        case "PAYVALID": await handlePay(args, context); break;
        case "PAYLIST": await handlePayList(context); break;
        case "DELPAY": await handleDelPay(context); break;
        case "MODPAY": await handleModPay(context); break;
        case "REVLIST": await handleRevList(context); break;
        case "REVCLI": await handleRevCli(args, context); break;
        case "REV": await handleRev(args, context); break;
        case "REVHIS": await handleRevHis(context); break;
        case "USER": renderUser(context.screen, context.profile, context.user); break;
        case "CTX": renderContext(context.screen, context.currentDossier); break;
        case "LOGOUT": await handleLogout(); break;
        case "PROMOK": await handlePromStatut(context, "TENUE"); break;
        case "PROMKO": await handlePromStatut(context, "NON_TENUE"); break;
        case "PROMANNUL": await handlePromStatut(context, "ANNULEE"); break;
        default:
            renderMessage(context.screen, "COMMANDE INCONNUE", `LA COMMANDE "${command}" N'EST PAS ENCORE DISPONIBLE. TAPEZ HELP.`);
    }
}


async function handleDash(context) {
    context.setView("dash");

    context.screen.innerHTML = `
        <section>
            <h2>DASH</h2>
            <p>CHARGEMENT DU TABLEAU DE BORD...</p>
        </section>
    `;

    const result = await getDashboardData();

    if (result.error) {
        renderMessage(context.screen, "DASH", result.error);
        return;
    }

    renderDashboardScreen(context.screen, result.data);
}


async function handleImportPai(context) {
    pendingImportPai = null;
    context.setView("importPai");

    renderImportPaiUploadScreen(
        context.screen,
        async (text) => {
            await analyserImportPai(text, context);
        }
    );
}

async function analyserImportPai(text, context) {
    const parsed = parseImportPaiCsv(text);
    const ok = [];
    const ko = [];

    for (const line of parsed.data) {
        const dossier = await getDossierByReference(line.referenceDossier);

        if (dossier.error || !dossier.data) {
            ko.push({
                ...line,
                error: "DOSSIER INTROUVABLE"
            });
            continue;
        }

        ok.push({
            ...line,
            dossier: dossier.data
        });
    }

    pendingImportPai = {
        ok,
        ko,
        parseErrors: parsed.errors,
        totalValid: parsed.data.length
    };

    renderImportPaiPreviewScreen(context.screen, pendingImportPai);
}

async function handleImportPaiValid(context) {
    if (!pendingImportPai) {
        renderMessage(context.screen, "IMPORTPAI", "AUCUN IMPORT EN ATTENTE. UTILISEZ IMPORTPAI.");
        return;
    }

    const result = {
        created: 0,
        errors: []
    };

    for (const line of pendingImportPai.ok) {
        const paiement = await createPaiement({
            dossierId: line.dossier.id,
            montant: line.montant,
            modePaiement: line.modePaiement,
            referencePaiement: `IMPORT LIGNE ${line.lineNumber}`,
            commentaire: `IMPORTPAI ${line.referenceDossier}`,
            userId: context.user?.id,
            datePaiement: line.datePaiement
        });

        if (paiement.error) {
            result.errors.push({
                ...line,
                error: paiement.error
            });
            continue;
        }

        const affectation = await affecterPaiementAuxEcheances({
            dossierId: line.dossier.id,
            paiementId: paiement.data.id,
            montant: line.montant
        });

        if (affectation.error) {
            result.errors.push({
                ...line,
                error: affectation.error
            });
            continue;
        }

        await creerHonorairePaiement(
            line.dossier,
            paiement.data,
            line.montant,
            `IMPORTPAI LIGNE ${line.lineNumber}`
        );

        await addHistorique({
            dossierId: line.dossier.id,
            typeEvenement: "PAY",
            libelle: `PAIEMENT IMPORTE ${formatMoney(line.montant)}`,
            detail: `${formatDate(line.datePaiement)} ${line.modePaiement} IMPORTPAI LIGNE ${line.lineNumber}`,
            utilisateurId: context.user?.id
        });

        if (affectation.montantAffecte > 0) {
            await addHistorique({
                dossierId: line.dossier.id,
                typeEvenement: "ECH",
                libelle: "PAIEMENT IMPORTE AFFECTE ECHEANCIER",
                detail: `${formatMoney(affectation.montantAffecte)} AFFECTE - RELIQUAT ${formatMoney(affectation.reliquat || 0)}`,
                utilisateurId: context.user?.id
            });
        }

        const syncSolde = await synchroniserStatutSoldeDossier(context, line.dossier);

        if (syncSolde.error) {
            result.errors.push({
                ...line,
                error: syncSolde.error
            });
            continue;
        }

        result.created += 1;
    }

    for (const line of pendingImportPai.ko) {
        result.errors.push(line);
    }

    for (const error of pendingImportPai.parseErrors) {
        result.errors.push({
            lineNumber: "-",
            referenceDossier: "-",
            error
        });
    }

    pendingImportPai = null;
    renderImportPaiResultScreen(context.screen, result);
}

async function handleImportPaiCancel(context) {
    pendingImportPai = null;
    renderMessage(context.screen, "IMPORTPAI", "IMPORT PAIEMENTS ANNULE.");
}


async function handleImportDos(context) {
    pendingImportDos = null;
    context.setView("importDos");

    renderImportDosUploadScreen(
        context.screen,
        async (text, fileName) => {
            await analyserImportDos(text, context, fileName);
        }
    );
}

async function analyserImportDos(text, context, fileName = "") {
    const parsed = parseImportDosCsv(text);
    const ok = [];
    const ko = [];
    const skipped = [];

    for (const line of parsed.data) {
        // Une reference deja presente dans POREC est volontairement ignoree.
        // L'import ne met jamais a jour silencieusement un dossier existant.
        if (line.referenceDossier && await dossierReferenceExists(line.referenceDossier)) {
            skipped.push({
                ...line,
                reason: `DEJA PRESENT DANS POREC : ${line.referenceDossier}`
            });
            continue;
        }

        const clientResult = await getClientByReference(line.referenceClient);

        if (clientResult.error || !clientResult.data) {
            ko.push({
                ...line,
                error: `CLIENT INTROUVABLE : ${line.referenceClient}. CREER/CONTROLER LE CLIENT AVANT IMPORT.`
            });
            continue;
        }

        const client = clientResult.data;
        if (client.actif === false) {
            ko.push({
                ...line,
                error: `CLIENT INACTIF : ${line.referenceClient}`
            });
            continue;
        }

        // Double controle reference + nom pour eviter une affectation au mauvais creancier.
        if (line.clientCsv?.nom && normalizeImportCompare(line.clientCsv.nom) !== normalizeImportCompare(client.nom)) {
            ko.push({
                ...line,
                error: `CLIENT INCOHERENT : REF ${line.referenceClient} = ${client.nom}, CSV = ${line.clientCsv.nom}`
            });
            continue;
        }

        let tarifHonorairesId = null;
        let tarifCodeEffectif = line.tarifHonorairesCode || "";

        if (line.tarifHonorairesCode) {
            const tarifResult = await getTarifByCode(line.tarifHonorairesCode);
            if (tarifResult.error || !tarifResult.data || tarifResult.data.actif === false) {
                ko.push({
                    ...line,
                    error: `TARIF INTROUVABLE OU INACTIF : ${line.tarifHonorairesCode}`
                });
                continue;
            }
            tarifHonorairesId = tarifResult.data.id;
            tarifCodeEffectif = tarifResult.data.code_tarif;
        } else if (client.tarif_defaut_id) {
            const tarifResult = await getTarifById(client.tarif_defaut_id);
            if (tarifResult.error || !tarifResult.data || tarifResult.data.actif === false) {
                ko.push({
                    ...line,
                    error: `TARIF PAR DEFAUT CLIENT INTROUVABLE OU INACTIF : ${line.referenceClient}`
                });
                continue;
            }
            tarifHonorairesId = tarifResult.data.id;
            tarifCodeEffectif = tarifResult.data.code_tarif;
        } else {
            ko.push({
                ...line,
                error: `TARIF DOSSIER MANQUANT ET CLIENT SANS TARIF PAR DEFAUT : ${line.referenceClient}`
            });
            continue;
        }

        ok.push({
            ...line,
            client,
            tarifHonorairesId,
            tarifCodeEffectif
        });
    }

    pendingImportDos = {
        ok,
        ko,
        skipped,
        parseErrors: parsed.errors,
        totalValid: parsed.data.length,
        delimiter: parsed.delimiter,
        fileName
    };

    renderImportDosPreviewScreen(context.screen, pendingImportDos);
}

function normalizeImportCompare(value) {
    return String(value || "")
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z0-9]/g, "");
}

async function handleImportDosValid(context) {
    if (!pendingImportDos) {
        renderMessage(context.screen, "IMPORTDOS", "AUCUN IMPORT EN ATTENTE. UTILISEZ IMPORTDOS.");
        return;
    }

    const result = {
        created: 0,
        skipped: pendingImportDos.skipped?.length || 0,
        createdRefs: [],
        errors: []
    };

    for (const line of pendingImportDos.ok) {
        const creation = await createDossierComplet({
            dossierValues: {
                reference_dossier: line.referenceDossier || null,
                reference_client: line.referenceClient,
                tarif_honoraires_id: line.tarifHonorairesId || null,
                tarif_honoraires_code: line.tarifHonorairesCode || null,
                statut_code: line.statutCode || "AMIABLE",
                priorite: line.priorite || "NORMALE",
                montant_principal_initial: line.montantPrincipal,
                date_creance: line.dateCreance,
                date_prescription: line.datePrescription,
                date_rappel: line.dateRappel,
                motif_rappel: line.motifRappel,
                type_interet: line.typeInteret,
                taux_interet: line.tauxInteret,
                date_depart_interets: line.dateDepartInterets,
                date_mise_en_demeure: line.dateMiseEnDemeure,
                med_envoyee: line.medEnvoyee,
                indemnite_40_euros: line.indemnite40,
                observations: line.observations
            },
            debiteurValues: {
                type_debiteur: line.typeDebiteur,
                nom: line.nom,
                prenom: line.prenom,
                adresse: line.adresse,
                adresse_ligne_2: line.adresseLigne2,
                code_postal: line.codePostal,
                ville: line.ville,
                pays: line.pays,
                telephone_fixe: line.telephoneFixe,
                telephone_mobile: line.telephoneMobile,
                email: line.email,
                employeur: line.employeur,
                iban: line.iban || null,
                bic: line.bic || null,
                mandat_sepa_reference: line.mandatSepaReference || null,
                mandat_sepa_date_signature: line.mandatSepaDateSignature
            }
        });

        if (creation.error) {
            result.errors.push({
                ...line,
                error: creation.error
            });
            continue;
        }

        await addHistorique({
            dossierId: creation.data.id,
            typeEvenement: "ADDOS",
            libelle: "DOSSIER CREE PAR IMPORT",
            detail: `IMPORTDOS LIGNE ${line.lineNumber}`,
            utilisateurId: context.user?.id
        });

        result.created += 1;
        result.createdRefs.push({
            reference_dossier: creation.data.reference_dossier,
            reference_client: creation.data.reference_client,
            nom: creation.data.debiteurs?.nom || line.nom
        });
    }

    for (const line of pendingImportDos.ko) {
        result.errors.push(line);
    }

    for (const error of pendingImportDos.parseErrors) {
        result.errors.push({
            lineNumber: "-",
            referenceDossier: "-",
            error
        });
    }

    pendingImportDos = null;
    renderImportDosResultScreen(context.screen, result);
}

async function handleImportDosCancel(context) {
    pendingImportDos = null;
    renderMessage(context.screen, "IMPORTDOS", "IMPORT DOSSIERS ANNULE.");
}


async function handleDos(args, context) {
    const reference = args[0] || context.currentDossier?.reference_dossier;

    if (!reference) {
        renderMessage(context.screen, "DOS", "AUCUN DOSSIER ACTIF. SYNTAXE : DOS [REFERENCE_DOSSIER]");
        return;
    }

    context.screen.innerHTML = `<section><h2>DOSSIER</h2><p>RECHERCHE DU DOSSIER ${reference}...</p></section>`;

    const { data, error } = await getDossierByReference(reference);

    if (error) {
        renderMessage(context.screen, "DOSSIER INTROUVABLE", error);
        return;
    }

    setContextDossier(context, data);

const stats = await getDossierStats(data.id);

const paiements = await getPaiementsByDossier(data.id);

const situation = calculerSituationFinanciere(
    data,
    paiements.data || []
);

await renderDossierScreen(
    context.screen,
    data,
    stats,
    situation
);
}


async function handleGroupe(context) {
    const dossier = context.currentDossier;
    if (!dossier?.id) {
        renderMessage(context.screen, "GROUPE", "AUCUN DOSSIER ACTIF. OUVREZ D'ABORD UN DOSSIER AVEC DOS [REFERENCE].");
        return;
    }

    if (!dossier.groupe_dossier_id) {
        const candidats = await findGroupCandidates(dossier);
        const lignes = (candidats.data || []).map((d) => {
            const deb = d.debiteurs || {};
            return `${String(d.reference_dossier || "").padEnd(14)} ${String(d.statut_code || "").padEnd(12)} ${formatMoney(d.montant_principal_initial)}  ${String(deb.nom || "")} ${String(deb.prenom || "")}`;
        });
        const complement = lignes.length
            ? `\nDOSSIERS POTENTIELLEMENT LIES :\n${lignes.join("\n")}\n\nPOUR GROUPER : GROUPER ${String(candidats.data[0]?.reference_dossier || "[REFERENCE]")}`
            : "\nAUCUN AUTRE DOSSIER CORRESPONDANT DETECTE AUTOMATIQUEMENT.\nUTILISEZ GROUPER [REFERENCE] POUR UN RATTACHEMENT MANUEL.";
        renderMessage(context.screen, "GROUPE", `DOSSIER ${dossier.reference_dossier} NON GROUPE.${candidats.error ? `\n${candidats.error}` : complement}`);
        return;
    }

    const groupe = await getDossiersByGroupId(dossier.groupe_dossier_id);
    if (groupe.error) {
        renderMessage(context.screen, "GROUPE", groupe.error);
        return;
    }

    const lignes = [];
    let total = 0;
    for (const d of groupe.data || []) {
        const paiements = await getPaiementsByDossier(d.id);
        const situation = calculerSituationFinanciere(d, paiements.data || []);
        const restant = Number(situation.totalRestantDu ?? d.montant_principal_initial ?? 0);
        total += restant;
        const marque = d.id === dossier.id ? ">" : " ";
        lignes.push(`${marque} ${String(d.reference_dossier || "").padEnd(13)} ${String(d.statut_code || "").padEnd(12)} ${formatMoney(restant).padStart(14)}  ${String(d.creanciers?.nom || "")}`);
    }

    context.screen.innerHTML = `
        <section>
            <h2>GROUPE DE DOSSIERS</h2>
            <pre class="terminal-table">GROUPE : ${dossier.groupe_dossier_id}
DOSSIERS : ${(groupe.data || []).length}
TOTAL RESTANT DU : ${formatMoney(total)}

  REFERENCE     STATUT          RESTANT DU       CREANCIER
---------------------------------------------------------------
${lignes.join("\n")}

> = DOSSIER ACTIF
COMMANDES : GROUPER [REF ...] / DEGROUPER</pre>
        </section>
    `;
}

async function handleGrouper(args, context) {
    const dossier = context.currentDossier;
    if (!dossier?.id) {
        renderMessage(context.screen, "GROUPER", "AUCUN DOSSIER ACTIF. OUVREZ D'ABORD UN DOSSIER AVEC DOS [REFERENCE].");
        return;
    }

    const refs = (args || []).map((r) => String(r || "").trim().toUpperCase()).filter(Boolean);
    if (!refs.length) {
        const candidats = await findGroupCandidates(dossier);
        if (candidats.error && !(candidats.data || []).length) {
            renderMessage(context.screen, "GROUPER", candidats.error);
            return;
        }
        const data = (candidats.data || []).filter((d) => d.groupe_dossier_id !== dossier.groupe_dossier_id || !dossier.groupe_dossier_id);
        if (!data.length) {
            renderMessage(context.screen, "GROUPER", "AUCUN DOSSIER SUPPLEMENTAIRE DETECTE. SYNTAXE MANUELLE : GROUPER [REFERENCE] [REFERENCE...]");
            return;
        }
        const lignes = data.map((d) => {
            const deb = d.debiteurs || {};
            const deja = d.groupe_dossier_id ? " [DEJA GROUPE]" : "";
            return `${String(d.reference_dossier || "").padEnd(14)} ${String(d.statut_code || "").padEnd(12)} ${formatMoney(d.montant_principal_initial)}  ${String(deb.nom || "")} ${String(deb.prenom || "")}${deja}`;
        });
        context.screen.innerHTML = `
            <section><h2>GROUPER - CANDIDATS</h2><pre class="terminal-table">DOSSIER ACTIF : ${dossier.reference_dossier}

${lignes.join("\n")}

POUR CONFIRMER, TAPEZ :
GROUPER ${data.map((d) => d.reference_dossier).join(" ")}

VOUS POUVEZ AUSSI NE SAISIR QU'UNE PARTIE DES REFERENCES.</pre></section>`;
        return;
    }

    const result = await grouperDossiers({ dossierCourant: dossier, references: refs });
    if (result.error) {
        renderMessage(context.screen, "GROUPER", result.error);
        return;
    }

    const refreshed = await getDossierByReference(dossier.reference_dossier);
    if (refreshed.data) setContextDossier(context, refreshed.data);

    renderMessage(
        context.screen,
        "GROUPER",
        `GROUPE CREE / MIS A JOUR AVEC SUCCES.\n${(result.data?.dossiers || []).length} DOSSIER(S) DANS LE GROUPE.\nTAPEZ GROUPE POUR AFFICHER LE DETAIL.`
    );
}

async function handleDegrouper(args, context) {
    let dossier = context.currentDossier;
    const ref = String(args?.[0] || "").trim().toUpperCase();

    if (ref) {
        const recherche = await getDossierByReference(ref);
        if (recherche.error || !recherche.data) {
            renderMessage(context.screen, "DEGROUPER", recherche.error || "DOSSIER INTROUVABLE.");
            return;
        }
        dossier = recherche.data;
    }

    if (!dossier?.id) {
        renderMessage(context.screen, "DEGROUPER", "AUCUN DOSSIER ACTIF. SYNTAXE : DEGROUPER [REFERENCE].");
        return;
    }

    const result = await degrouperDossier(dossier);
    if (result.error) {
        renderMessage(context.screen, "DEGROUPER", result.error);
        return;
    }

    if (context.currentDossier?.id === dossier.id) {
        const refreshed = await getDossierByReference(dossier.reference_dossier);
        if (refreshed.data) setContextDossier(context, refreshed.data);
    }

    renderMessage(context.screen, "DEGROUPER", `DOSSIER ${dossier.reference_dossier} RETIRE DU GROUPE.\nSI UN SEUL DOSSIER RESTAIT, LE GROUPE A ETE AUTOMATIQUEMENT DISSOUS.`);
}


async function handleListeDossiers(context) {
    context.setView("liste");

    context.screen.innerHTML = `
        <section>
            <h2>LST</h2>
            <p>CHARGEMENT DE LA LISTE DES DOSSIERS...</p>
        </section>
    `;

    const result = await getListeDossiers(context.getPage("liste"));

    if (result.error) {
        renderMessage(context.screen, "LST", result.error);
        return;
    }

    renderLstScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleListeDossiersNext(context) {
    const nextPage = context.getPage("liste") + 1;

    context.setPage("liste", nextPage);

    await handleListeDossiers(context);
}

async function handleListeDossiersPrev(context) {
    const prevPage = Math.max(1, context.getPage("liste") - 1);

    context.setPage("liste", prevPage);

    await handleListeDossiers(context);
}


async function handleTarifs(context) {
    context.setView("tarifs");

    context.screen.innerHTML = `
        <section>
            <h2>TARIFS</h2>
            <p>CHARGEMENT DES TARIFS...</p>
        </section>
    `;

    const result = await getTarifs(context.getPage("tarifs"));

    if (result.error) {
        renderMessage(context.screen, "TARIFS", result.error);
        return;
    }

    renderTarifsScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleTarifsNext(context) {
    const nextPage = context.getPage("tarifs") + 1;
    context.setPage("tarifs", nextPage);
    await handleTarifs(context);
}

async function handleTarifsPrev(context) {
    const prevPage = Math.max(1, context.getPage("tarifs") - 1);
    context.setPage("tarifs", prevPage);
    await handleTarifs(context);
}

async function handleAddTarif(context) {
    openTarifForm(
        context,
        "ADDTAR",
        null,
        async (values, submitContext) => {
            await submitAddTarif(values, submitContext);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDTAR", "CREATION TARIF ANNULEE.");
        }
    );
}

async function submitAddTarif(values, context) {
    const result = await createTarif(values);

    if (result.error) {
        renderMessage(context.screen, "ADDTAR", result.error);
        return;
    }

    context.resetPage("tarifs");
    await handleTarifs(context);
}

async function handleModTarif(args, context) {
    const code = args[0];

    if (!code) {
        renderMessage(context.screen, "MODTAR", "SYNTAXE : MODTAR [CODE_TARIF]");
        return;
    }

    const tarif = await getTarifByCode(code);

    if (tarif.error) {
        renderMessage(context.screen, "MODTAR", tarif.error);
        return;
    }

    openTarifForm(
        context,
        "MODTAR",
        tarif.data,
        async (values, submitContext) => {
            await submitModTarif(values, submitContext, tarif.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODTAR", "MODIFICATION TARIF ANNULEE.");
        }
    );
}

async function submitModTarif(values, context, tarif) {
    const result = await updateTarif(tarif.id, values);

    if (result.error) {
        renderMessage(context.screen, "MODTAR", result.error);
        return;
    }

    await handleTarifs(context);
}

async function handleDelTarif(args, context) {
    const code = args[0];

    if (!code) {
        renderMessage(context.screen, "DELTAR", "SYNTAXE : DELTAR [CODE_TARIF]");
        return;
    }

    const tarif = await getTarifByCode(code);

    if (tarif.error) {
        renderMessage(context.screen, "DELTAR", tarif.error);
        return;
    }

    openDelTarifForm(
        context,
        tarif.data,
        async (values, submitContext) => {
            await submitDelTarif(values, submitContext, tarif.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELTAR", "DESACTIVATION TARIF ANNULEE.");
        }
    );
}

async function submitDelTarif(values, context, tarif) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELTAR", "DESACTIVATION NON CONFIRMEE.");
        return;
    }

    const result = await disableTarif(tarif.id);

    if (result.error) {
        renderMessage(context.screen, "DELTAR", result.error);
        return;
    }

    await handleTarifs(context);
}



async function handleTarifPaliers(args, context) {
    const code = args[0] || currentTarifPaliersCode;

    if (!code) {
        renderMessage(context.screen, "TARPAL", "SYNTAXE : TARPAL [CODE_TARIF]");
        return;
    }

    currentTarifPaliersCode = String(code).toUpperCase();
    context.setView("tarifPaliers");

    context.screen.innerHTML = `
        <section>
            <h2>TARPAL</h2>
            <p>CHARGEMENT DES PALIERS...</p>
        </section>
    `;

    const result = await getPaliersByTarifCode(
        currentTarifPaliersCode,
        context.getPage("tarifPaliers")
    );

    if (result.error) {
        renderMessage(context.screen, "TARPAL", result.error);
        return;
    }

    renderTarifPaliersScreen(
        context.screen,
        result.tarif,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleTarifPaliersNext(context) {
    const nextPage = context.getPage("tarifPaliers") + 1;
    context.setPage("tarifPaliers", nextPage);
    await handleTarifPaliers([], context);
}

async function handleTarifPaliersPrev(context) {
    const prevPage = Math.max(1, context.getPage("tarifPaliers") - 1);
    context.setPage("tarifPaliers", prevPage);
    await handleTarifPaliers([], context);
}

async function handleAddPalier(args, context) {
    const code = args[0] || currentTarifPaliersCode;

    if (!code) {
        renderMessage(context.screen, "ADDPAL", "SYNTAXE : ADDPAL [CODE_TARIF]");
        return;
    }

    const tarif = await getTarifByCode(code);

    if (tarif.error) {
        renderMessage(context.screen, "ADDPAL", tarif.error);
        return;
    }

    currentTarifPaliersCode = tarif.data.code_tarif;

    openTarifPalierForm(
        context,
        "ADDPAL",
        tarif.data,
        null,
        async (values, submitContext) => {
            await submitAddPalier(values, submitContext, tarif.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDPAL", "CREATION PALIER ANNULEE.");
        }
    );
}

async function submitAddPalier(values, context, tarif) {
    const result = await createPalierTarif(tarif.id, values);

    if (result.error) {
        renderMessage(context.screen, "ADDPAL", result.error);
        return;
    }

    context.resetPage("tarifPaliers");
    await handleTarifPaliers([tarif.code_tarif], context);
}

async function handleModPalier(args, context) {
    const code = args[0] || currentTarifPaliersCode;
    const ordre = args[1];

    if (!code || !ordre) {
        renderMessage(context.screen, "MODPAL", "SYNTAXE : MODPAL [CODE_TARIF] [ORDRE]");
        return;
    }

    const result = await getPalierByTarifCodeAndOrdre(code, ordre);

    if (result.error) {
        renderMessage(context.screen, "MODPAL", result.error);
        return;
    }

    currentTarifPaliersCode = result.tarif.code_tarif;

    openTarifPalierForm(
        context,
        "MODPAL",
        result.tarif,
        result.data,
        async (values, submitContext) => {
            await submitModPalier(values, submitContext, result.tarif, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODPAL", "MODIFICATION PALIER ANNULEE.");
        }
    );
}

async function submitModPalier(values, context, tarif, palier) {
    const result = await updatePalierTarif(palier.id, tarif.id, values);

    if (result.error) {
        renderMessage(context.screen, "MODPAL", result.error);
        return;
    }

    await handleTarifPaliers([tarif.code_tarif], context);
}

async function handleDelPalier(args, context) {
    const code = args[0] || currentTarifPaliersCode;
    const ordre = args[1];

    if (!code || !ordre) {
        renderMessage(context.screen, "DELPAL", "SYNTAXE : DELPAL [CODE_TARIF] [ORDRE]");
        return;
    }

    const result = await getPalierByTarifCodeAndOrdre(code, ordre);

    if (result.error) {
        renderMessage(context.screen, "DELPAL", result.error);
        return;
    }

    currentTarifPaliersCode = result.tarif.code_tarif;

    openDelPalierForm(
        context,
        result.tarif,
        result.data,
        async (values, submitContext) => {
            await submitDelPalier(values, submitContext, result.tarif, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELPAL", "SUPPRESSION PALIER ANNULEE.");
        }
    );
}

async function submitDelPalier(values, context, tarif, palier) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELPAL", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    const result = await deletePalierTarif(palier.id);

    if (result.error) {
        renderMessage(context.screen, "DELPAL", result.error);
        return;
    }

    await handleTarifPaliers([tarif.code_tarif], context);
}



async function handleContentieux(context) {
    context.setView("contentieux");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "CONT", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getContentieuxByDossier(dossier.id);

    if (result.error) {
        renderMessage(context.screen, "CONT", result.error);
        return;
    }

    renderContentieuxScreen(context.screen, dossier, result.data);
}

async function handleAddContentieux(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "ADDCONT", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const existing = await getContentieuxByDossier(dossier.id);

    if (existing.error) {
        renderMessage(context.screen, "ADDCONT", existing.error);
        return;
    }

    if (existing.data) {
        renderMessage(context.screen, "ADDCONT", "UN CONTENTIEUX EXISTE DEJA POUR CE DOSSIER. UTILISEZ MODCONT.");
        return;
    }

    const huissiers = await getHuissierOptions();

    if (huissiers.error) {
        renderMessage(context.screen, "ADDCONT", huissiers.error);
        return;
    }

    if (!huissiers.options.length) {
        renderMessage(context.screen, "ADDCONT", "AUCUN HUISSIER ACTIF. UTILISEZ ADDHUI.");
        return;
    }

    openContentieuxForm(
        context,
        "ADDCONT",
        dossier,
        null,
        huissiers.options,
        async (values, submitContext) => {
            await submitAddContentieux(values, submitContext, dossier);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDCONT", "CREATION CONTENTIEUX ANNULEE.");
        }
    );
}

async function submitAddContentieux(values, context, dossier) {
    const huissierReference = String(values.reference_huissier || "").trim().toUpperCase();
    const huissier = await getHuissierByReference(huissierReference);

    if (huissier.error || !huissier.data) {
        renderMessage(context.screen, "ADDCONT", "HUISSIER INTROUVABLE.");
        return;
    }

    const dateTransmission = dateOrNull(values.date_transmission);

    if (!dateTransmission) {
        renderMessage(context.screen, "ADDCONT", "DATE TRANSMISSION INVALIDE.");
        return;
    }

    const creation = await createContentieuxDossier({
        dossierId: dossier.id,
        huissierId: huissier.data.id,
        dateTransmission,
        referenceHuissierDossier: values.reference_huissier_dossier,
        etatContentieux: values.etat_contentieux,
        observations: values.observations
    });

    if (creation.error) {
        renderMessage(context.screen, "ADDCONT", creation.error);
        return;
    }

    const statutUpdate = await updateStatutDossier({
        dossierId: dossier.id,
        statutCode: "CONTENTIEUX"
    });

    if (statutUpdate.error) {
        renderMessage(context.screen, "ADDCONT", statutUpdate.error);
        return;
    }

    if (statutUpdate.data) {
        setContextDossier(context, statutUpdate.data);
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "CONT",
        libelle: "DOSSIER TRANSMIS AU CONTENTIEUX",
        detail: `${huissier.data.reference_huissier || ""} ${huissier.data.nom || ""} - ${String(values.etat_contentieux || "TRANSMIS").toUpperCase()}`.trim(),
        utilisateurId: context.user?.id
    });

    const contentieux = await getContentieuxByDossier(dossier.id);
    renderContentieuxScreen(context.screen, statutUpdate.data || dossier, contentieux.data || creation.data);
}

async function handleModContentieux(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "MODCONT", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getContentieuxByDossier(dossier.id);

    if (result.error) {
        renderMessage(context.screen, "MODCONT", result.error);
        return;
    }

    if (!result.data) {
        renderMessage(context.screen, "MODCONT", "AUCUN CONTENTIEUX SUR CE DOSSIER. UTILISEZ ADDCONT.");
        return;
    }

    const huissiers = await getHuissierOptions();

    if (huissiers.error) {
        renderMessage(context.screen, "MODCONT", huissiers.error);
        return;
    }

    openContentieuxForm(
        context,
        "MODCONT",
        dossier,
        result.data,
        huissiers.options,
        async (values, submitContext) => {
            await submitModContentieux(values, submitContext, dossier, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODCONT", "MODIFICATION CONTENTIEUX ANNULEE.");
        }
    );
}

async function submitModContentieux(values, context, dossier, contentieux) {
    const huissierReference = String(values.reference_huissier || "").trim().toUpperCase();
    const huissier = await getHuissierByReference(huissierReference);

    if (huissier.error || !huissier.data) {
        renderMessage(context.screen, "MODCONT", "HUISSIER INTROUVABLE.");
        return;
    }

    const dateTransmission = dateOrNull(values.date_transmission);

    if (!dateTransmission) {
        renderMessage(context.screen, "MODCONT", "DATE TRANSMISSION INVALIDE.");
        return;
    }

    const modification = await updateContentieuxDossier({
        contentieuxId: contentieux.id,
        huissierId: huissier.data.id,
        dateTransmission,
        referenceHuissierDossier: values.reference_huissier_dossier,
        etatContentieux: values.etat_contentieux,
        observations: values.observations
    });

    if (modification.error) {
        renderMessage(context.screen, "MODCONT", modification.error);
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "CONT",
        libelle: "CONTENTIEUX MODIFIE",
        detail: `${huissier.data.reference_huissier || ""} ${huissier.data.nom || ""} - ${String(values.etat_contentieux || "").toUpperCase()}`.trim(),
        utilisateurId: context.user?.id
    });

    renderContentieuxScreen(context.screen, dossier, modification.data);
}


async function handleClotureContentieux(context, issue) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, issue === "JUDICIAIRE" ? "CONTJUD" : "CONTIRR", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getContentieuxByDossier(dossier.id);

    if (result.error) {
        renderMessage(context.screen, issue === "JUDICIAIRE" ? "CONTJUD" : "CONTIRR", result.error);
        return;
    }

    if (!result.data) {
        renderMessage(context.screen, issue === "JUDICIAIRE" ? "CONTJUD" : "CONTIRR", "AUCUN CONTENTIEUX SUR CE DOSSIER. UTILISEZ ADDCONT.");
        return;
    }

    const cloture = await cloturerContentieuxDossier({
        contentieuxId: result.data.id,
        issueContentieux: issue
    });

    if (cloture.error) {
        renderMessage(context.screen, issue === "JUDICIAIRE" ? "CONTJUD" : "CONTIRR", cloture.error);
        return;
    }

    const statutUpdate = await updateStatutDossier({
        dossierId: dossier.id,
        statutCode: issue
    });

    if (statutUpdate.error) {
        renderMessage(context.screen, issue === "JUDICIAIRE" ? "CONTJUD" : "CONTIRR", statutUpdate.error);
        return;
    }

    if (statutUpdate.data) {
        setContextDossier(context, statutUpdate.data);
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "CONT",
        libelle: issue === "JUDICIAIRE"
            ? "DOSSIER TRANSMIS AU JUDICIAIRE"
            : "DOSSIER CLASSE IRRECOUVRABLE",
        detail: "CLOTURE CONTENTIEUX",
        utilisateurId: context.user?.id
    });

    renderContentieuxScreen(context.screen, statutUpdate.data || dossier, cloture.data);
}

async function handleSmsTypes(context) {
    context.setView("smsTypes");

    context.screen.innerHTML = `
        <section>
            <h2>SMSTYPES</h2>
            <p>CHARGEMENT DES MODELES SMS...</p>
        </section>
    `;

    const result = await getSmsModeles(context.getPage("smsTypes"));

    if (result.error) {
        renderMessage(context.screen, "SMSTYPES", result.error);
        return;
    }

    renderSmsTypesScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleSmsTypesNext(context) {
    const nextPage = context.getPage("smsTypes") + 1;
    context.setPage("smsTypes", nextPage);
    await handleSmsTypes(context);
}

async function handleSmsTypesPrev(context) {
    const prevPage = Math.max(1, context.getPage("smsTypes") - 1);
    context.setPage("smsTypes", prevPage);
    await handleSmsTypes(context);
}

async function handleAddSmsModele(context) {
    openSmsModeleForm(
        context,
        "ADDSMS",
        null,
        async (values, submitContext) => {
            await submitAddSmsModele(values, submitContext);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDSMS", "CREATION MODELE SMS ANNULEE.");
        }
    );
}

async function submitAddSmsModele(values, context) {
    const result = await createSmsModele(values);

    if (result.error) {
        renderMessage(context.screen, "ADDSMS", result.error);
        return;
    }

    context.resetPage("smsTypes");
    await handleSmsTypes(context);
}

async function handleModSmsModele(args, context) {
    const code = args[0];

    if (!code) {
        renderMessage(context.screen, "MODSMS", "SYNTAXE : MODSMS [CODE_MODELE]");
        return;
    }

    const result = await getSmsModeleByCode(code);

    if (result.error) {
        renderMessage(context.screen, "MODSMS", result.error);
        return;
    }

    openSmsModeleForm(
        context,
        "MODSMS",
        result.data,
        async (values, submitContext) => {
            await submitModSmsModele(values, submitContext, result.data.id);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODSMS", "MODIFICATION MODELE SMS ANNULEE.");
        }
    );
}

async function submitModSmsModele(values, context, modeleId) {
    const result = await updateSmsModele(modeleId, values);

    if (result.error) {
        renderMessage(context.screen, "MODSMS", result.error);
        return;
    }

    context.resetPage("smsTypes");
    await handleSmsTypes(context);
}

async function handleDelSmsModele(args, context) {
    const code = args[0];

    if (!code) {
        renderMessage(context.screen, "DELSMS", "SYNTAXE : DELSMS [CODE_MODELE]");
        return;
    }

    const result = await getSmsModeleByCode(code);

    if (result.error) {
        renderMessage(context.screen, "DELSMS", result.error);
        return;
    }

    openDelSmsModeleForm(
        context,
        result.data,
        async (values, submitContext) => {
            await submitDelSmsModele(values, submitContext, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELSMS", "DESACTIVATION MODELE SMS ANNULEE.");
        }
    );
}

async function submitDelSmsModele(values, context, modele) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELSMS", "DESACTIVATION NON CONFIRMEE.");
        return;
    }

    const result = await disableSmsModele(modele.id);

    if (result.error) {
        renderMessage(context.screen, "DELSMS", result.error);
        return;
    }

    context.resetPage("smsTypes");
    await handleSmsTypes(context);
}

async function handleSms(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "SMS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const lancer = async (portee = "DOSSIER", groupContext = null) => {
        const modeles = await getSmsModelesActifs();

        if (modeles.error) {
            renderMessage(context.screen, "SMS", modeles.error);
            return;
        }

        if (!modeles.data.length) {
            renderMessage(context.screen, "SMS", "AUCUN MODELE SMS ACTIF. UTILISEZ ADDSMS.");
            return;
        }

        const debiteur = dossier.debiteurs || {};
        const defaultPhone = debiteur.telephone_mobile || debiteur.telephone_fixe || "";
        const options = modeles.data.map((modele) => modele.code_modele);

        openSmsSelectionForm(
            context,
            portee === "GROUPE" ? groupContext.dossierSynthese : dossier,
            options,
            defaultPhone,
            async (values, submitContext) => {
                await submitSmsSelection(values, submitContext, dossier, portee, groupContext);
            },
            (cancelContext) => {
                renderMessage(cancelContext.screen, "SMS", "ENVOI SMS ANNULE.");
            }
        );
    };

    if (!dossier.groupe_dossier_id) {
        await lancer();
        return;
    }

    const group = await buildGroupActionContext(dossier);
    if (group.error) {
        renderMessage(context.screen, "SMS", group.error);
        return;
    }

    openGroupScopeForm(
        context,
        dossier,
        group.data,
        "SMS",
        async (values, submitContext) => {
            const portee = String(values.portee || "1").trim() === "2" ? "GROUPE" : "DOSSIER";
            if (portee === "GROUPE" && group.data.multiCreancier) {
                renderMessage(
                    submitContext.screen,
                    "SMS",
                    "RELANCE GROUPE NON DISPONIBLE : LES DOSSIERS DU GROUPE APPARTIENNENT A PLUSIEURS CREANCIERS."
                );
                return;
            }
            await lancer(portee, group.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "SMS", "ENVOI SMS ANNULE.");
        }
    );
}

async function submitSmsSelection(values, context, dossier, portee = "DOSSIER", groupContext = null) {
    const codeModele =
        String(values.code_modele || "")
            .trim()
            .toUpperCase();

    const telephone =
        String(values.telephone || "")
            .trim();

    if (!codeModele || !telephone) {
        renderMessage(
            context.screen,
            "SMS",
            "MODELE ET TELEPHONE OBLIGATOIRES."
        );
        return;
    }

    const modele = await getSmsModeleByCode(codeModele);

    if (modele.error) {
        renderMessage(context.screen, "SMS", modele.error);
        return;
    }

    if (modele.data.actif === false) {
        renderMessage(context.screen, "SMS", "MODELE SMS INACTIF.");
        return;
    }

    if (portee === "GROUPE" && smsModeleUtiliseLienPaiement(modele.data)) {
        renderMessage(
            context.screen,
            "SMS",
            "CE MODELE CONTIENT UN LIEN DE PAIEMENT. IL N'EST PAS DISPONIBLE EN MODE GROUPE TANT QUE L'IMPUTATION D'UN PAIEMENT GROUPE N'EST PAS PARAMETREE."
        );
        return;
    }

    let dossierCible = dossier;
    let situation;

    if (portee === "GROUPE") {
        dossierCible = groupContext.dossierSynthese;
        situation = groupContext.situation;
    } else {
        const paiements = await getPaiementsByDossier(dossier.id);
        situation = calculerSituationFinanciere(dossier, paiements.data || []);
    }

    let paymentUrl = "";

    if (
        portee !== "GROUPE" &&
        smsModeleUtiliseLienPaiement(modele.data)
    ) {
        renderMessage(context.screen, "SMS", "CREATION DU LIEN DE PAIEMENT CENTRALPAY...");

        const installmentCount = codeModele === "PAY3" ? 3 : codeModele === "PAY4" ? 4 : null;
        const centralPay = await createCentralPayLink({
            dossier,
            situation,
            installmentCount
        });

        if (centralPay.error || !centralPay.paymentUrl) {
            renderMessage(
                context.screen,
                "SMS",
                `LIEN DE PAIEMENT NON CREE : ${centralPay.error || "ERREUR CENTRALPAY."}`
            );
            return;
        }

        paymentUrl = centralPay.smsUrl;
    }

    const message = buildSmsMessage({
        dossier: dossierCible,
        modele: modele.data,
        situation,
        paymentUrl
    });

    openSmsPreviewForm(
        context,
        dossierCible,
        modele.data,
        telephone,
        message,
        async (formValues, submitContext) => {
            await submitSmsEnvoi(
                formValues,
                submitContext,
                dossier,
                modele.data,
                portee,
                groupContext
            );
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "SMS", "ENVOI SMS ANNULE.");
        }
    );
}

async function submitSmsEnvoi(values, context, dossier, modele, portee = "DOSSIER", groupContext = null) {
    const telephone = String(values.telephone || "").trim();
    const message = String(values.message || "").trim();

    if (!telephone || !message) {
        const error = "TELEPHONE ET MESSAGE OBLIGATOIRES.";
        renderMessage(context.screen, "SMS", error);
        return { ok: false, error };
    }

    const dossierTrace = portee === "GROUPE"
        ? { ...groupContext.dossierSynthese, id: dossier.id }
        : dossier;

    const result = await sendSmsDossier({
        dossier: dossierTrace,
        modele,
        telephone,
        message,
        userId: context.user?.id
    });

    if (result.error) {
        renderMessage(context.screen, "SMS", result.error);
        return { ok: false, error: result.error };
    }

    if (portee === "GROUPE") {
        const refs = groupContext.references.join(" / ");
        await basculerGroupeNouveauVersAmiable(context, groupContext.dossiers, dossier.reference_dossier);
        const hist = await addHistoriqueGroupe({
            dossierActifId: dossier.id,
            dossierIds: groupContext.dossierIds,
            typeEvenement: "SMS",
            libelle: `SMS GROUPE ENVOYE ${modele.code_modele || ""}`,
            detail: `ACTION GROUPE - DOSSIERS ${refs} - DESTINATAIRE ${telephone} - MODELE ${modele.code_modele || ""}`.trim(),
            utilisateurId: context.user?.id
        });
        if (hist.error) {
            renderMessage(context.screen, "SMS", hist.error);
            return { ok: false, error: hist.error };
        }
        renderMessage(
            context.screen,
            "SMS GROUPE ENVOYE",
            `${telephone} - ${groupContext.references.length} DOSSIERS - MODELE ${modele.code_modele || ""}`
        );
        return { ok: true, error: null };
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "SMS",
        libelle: `SMS ENVOYE ${modele.code_modele || ""}`,
        detail: `DESTINATAIRE ${telephone} - MODELE ${modele.code_modele || ""}`.trim(),
        utilisateurId: context.user?.id
    });

    await basculerNouveauVersAmiable(context, dossier);

    renderMessage(
        context.screen,
        "SMS ENVOYE",
        `${telephone} - MODELE ${modele.code_modele || ""}`
    );

    return { ok: true, error: null };
}


async function handleCour(context) {
    const dossier = context.currentDossier;
    if (!dossier) {
        renderMessage(context.screen, "COUR", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);
    if (paiements.error) {
        renderMessage(context.screen, "COUR", paiements.error);
        return;
    }

    const situation = calculerSituationFinanciere(dossier, paiements.data || []);
    const debiteur = dossier.debiteurs || {};
    const creancier = dossier.creanciers?.nom || "-";
    const nom = [debiteur.prenom, debiteur.nom].filter(Boolean).join(" ").trim().toUpperCase() || "-";
    const solde = formatMoney(situation.totalRestantDu || 0);

    const esc = (value) => String(value ?? "")
        .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;").replaceAll('"', "&quot;");

    const focusInput = () => {
        window.setTimeout(() => {
            const input = context.screen.querySelector("#cour-terminal-input");
            input?.focus();
            if (input) input.selectionStart = input.selectionEnd = input.value.length;
        }, 0);
    };

    const renderTerminal = (body, prompt, { maxLength = 12 } = {}) => {
        context.screen.innerHTML = `
            <section class="cour-as400">
                <pre class="terminal-table">${body}</pre>
                <div class="cour-command-line">
                    <span>${esc(prompt)}</span>
                    <input id="cour-terminal-input"
                           class="cour-terminal-input"
                           type="text"
                           maxlength="${maxLength}"
                           autocomplete="off"
                           autocapitalize="characters"
                           spellcheck="false">
                </div>
            </section>
        `;
        focusInput();
        return context.screen.querySelector("#cour-terminal-input");
    };

    const attendreEntree = (input, callback) => {
        input?.addEventListener("keydown", async (event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            const value = String(input.value || "").trim().toUpperCase();
            input.disabled = true;
            await callback(value);
        });
    };

    const entete = () => `POREC V2 - GESTION DES COURRIERS
────────────────────────────────────────────────────────────

DOSSIER    : ${esc(dossier.reference_dossier || "")}
DEBITEUR   : ${esc(nom)}
CREANCIER  : ${esc(creancier)}
SOLDE DU   : ${esc(solde)}`;

    const afficherMenuTypes = (message = "") => {
        const lignes = COURRIER_TYPES.map((item) =>
            `  ${item.code}  ${item.libelle}${item.actif ? "" : "  [BIENTOT]"}`
        ).join("\n");

        const input = renderTerminal(
`${entete()}

TYPE DE COURRIER

${lignes}

  0  ANNULER${message ? `

${message}` : ""}`,
            "CHOIX > ",
            { maxLength: 1 }
        );

        attendreEntree(input, async (choix) => {
            if (choix === "0" || choix === "X") {
                renderMessage(context.screen, "COUR", "OPERATION ANNULEE.");
                return;
            }
            const type = COURRIER_TYPES.find((item) => item.code === choix);
            if (!type) {
                afficherMenuTypes("CHOIX INVALIDE.");
                return;
            }
            if (!type.actif) {
                afficherMenuTypes("MODELE DE COURRIER NON ENCORE DISPONIBLE.");
                return;
            }
            if (type.code === "5") {
                afficherSaisieCourrierLibre(type);
                return;
            }
            if (["1", "2", "3"].includes(type.code) && dossier.groupe_dossier_id) {
                await choisirPorteeCourrier(type);
                return;
            }
            await afficherModeTraitement(type, "", "", null);
        });
    };

    const choisirPorteeCourrier = async (type, message = "") => {
        const group = await buildGroupActionContext(dossier);
        if (group.error || !group.data) {
            await afficherModeTraitement(type, group.error || "GROUPE INDISPONIBLE : TRAITEMENT DU DOSSIER SEUL.", "", null);
            return;
        }
        if (group.data.multiCreancier) {
            await afficherModeTraitement(type, "GROUPE MULTI-CREANCIERS : LE COURRIER RESTE LIMITE AU DOSSIER SEUL.", "", null);
            return;
        }
        const refs = group.data.references || [];
        const totalGroupe = formatMoney(group.data.situation?.totalRestantDu || 0);
        const input = renderTerminal(
`${entete()}

DOSSIERS GROUPES DETECTES : ${refs.length}
TOTAL GROUPE               : ${esc(totalGroupe)}
REFERENCES                  : ${esc(refs.join(" / "))}

PORTEE DU COURRIER

  1  DOSSIER SEUL
  2  GROUPE / MULTI-FACTURES
  0  ANNULER${message ? `

${message}` : ""}`,
            "CHOIX > ",
            { maxLength: 1 }
        );
        attendreEntree(input, async (choix) => {
            if (choix === "0" || choix === "X") { renderMessage(context.screen, "COUR", "OPERATION ANNULEE."); return; }
            if (choix === "1") { await afficherModeTraitement(type, "", "", null); return; }
            if (choix === "2") { await afficherModeTraitement(type, "", "", group.data); return; }
            await choisirPorteeCourrier(type, "CHOIX INVALIDE.");
        });
    };

    const afficherSaisieCourrierLibre = (type, message = "", valeur = "") => {
        context.screen.innerHTML = `
            <section class="cour-as400">
                <pre class="terminal-table">${entete()}

COURRIER LIBRE

SAISISSEZ LE CORPS DU COURRIER (3000 CARACTERES MAXIMUM).
LES RETOURS A LA LIGNE SERONT CONSERVES.${message ? `

${esc(message)}` : ""}</pre>
                <div style="margin-top:12px">
                    <textarea id="cour-libre-body" class="terminal-input" maxlength="3000" spellcheck="true" style="width:min(105ch,95%);height:18em;display:block;padding:8px;white-space:pre-wrap;resize:vertical">${esc(valeur)}</textarea>
                </div>
                <div class="form-actions" style="margin-top:12px">
                    <button id="cour-libre-continue" type="button">CONTINUER</button>
                    <button id="cour-libre-cancel" type="button">ANNULER</button>
                </div>
            </section>
        `;
        const textarea = context.screen.querySelector("#cour-libre-body");
        textarea?.focus();
        context.screen.querySelector("#cour-libre-cancel")?.addEventListener("click", () => {
            renderMessage(context.screen, "COUR", "OPERATION ANNULEE.");
        });
        context.screen.querySelector("#cour-libre-continue")?.addEventListener("click", async () => {
            const corpsLibre = String(textarea?.value || "").replace(/\r/g, "").trim();
            if (corpsLibre.length < 10) {
                afficherSaisieCourrierLibre(type, "LE CORPS DU COURRIER EST OBLIGATOIRE (10 CARACTERES MINIMUM).", corpsLibre);
                return;
            }
            await afficherModeTraitement(type, "", corpsLibre);
        });
    };

    const afficherModeTraitement = async (type, message = "", corpsLibre = "", groupData = null) => {
        const preparation = groupData
            ? await preparerCourrierGroupe({ typeCode: type.code, groupData })
            : await preparerCourrier({ typeCode: type.code, dossier, situation, corpsLibre });
        if (preparation.error) {
            renderMessage(context.screen, "COUR", preparation.error);
            return;
        }

        const adresse = [
            nom,
            debiteur.adresse,
            debiteur.adresse_ligne_2,
            [debiteur.code_postal, String(debiteur.ville || "").toUpperCase()].filter(Boolean).join(" ")
        ].filter(Boolean).map((v) => esc(String(v).trim())).join("\n");

        const input = renderTerminal(
`${entete()}

COURRIER    : ${esc(type.libelle)}${groupData ? " - MULTI-FACTURES" : ""}
PORTEE      : ${groupData ? `GROUPE (${groupData.references.length} DOSSIERS)` : "DOSSIER SEUL"}

DESTINATAIRE
${adresse}

MODE DE TRAITEMENT

  1  APERCU DU COURRIER
  2  TRANSMETTRE A PINGEN
  3  PINGEN + EMAIL DEBITEUR
  0  ANNULER${message ? `

${message}` : ""}`,
            "CHOIX > ",
            { maxLength: 1 }
        );

        attendreEntree(input, async (choix) => {
            if (choix === "0" || choix === "X") {
                renderMessage(context.screen, "COUR", "OPERATION ANNULEE.");
                return;
            }
            if (choix === "1") {
                renderMessage(context.screen, "COUR", "GENERATION DE L'APERCU...");
                const opened = ouvrirApercuCourrier(preparation.data);
                if (opened.error) {
                    renderMessage(context.screen, "COUR", opened.error);
                    return;
                }
                renderMessage(
                    context.screen,
                    "COURRIER GENERE",
                    groupData ? `${type.libelle} MULTI-FACTURES - ${groupData.references.length} DOSSIERS. APERCU OUVERT DANS UN NOUVEL ONGLET.` : `${type.libelle} - DOSSIER ${dossier.reference_dossier}. APERCU OUVERT DANS UN NOUVEL ONGLET.`
                );
                return;
            }
            if (choix === "2") {
                afficherConfirmationPingen(type, "", false, corpsLibre, groupData);
                return;
            }
            if (choix === "3") {
                const emailDebiteur = String(dossier.debiteurs?.email || "").trim();
                if (!emailDebiteur) {
                    await afficherModeTraitement(type, "AUCUN EMAIL DEBITEUR RENSEIGNE SUR CE DOSSIER.", corpsLibre, groupData);
                    return;
                }
                afficherConfirmationPingen(type, "", true, corpsLibre, groupData);
                return;
            }
            await afficherModeTraitement(type, "CHOIX INVALIDE.", corpsLibre, groupData);
        });
    };

    const afficherConfirmationPingen = (type, message = "", emailDebiteur = false, corpsLibre = "", groupData = null) => {
        const envLabel = "STAGING";
        const input = renderTerminal(
`POREC V2 - TRANSMISSION PINGEN
────────────────────────────────────────────────────────────

COURRIER       : ${esc(type.libelle)}${groupData ? " - MULTI-FACTURES" : ""}
PORTEE         : ${groupData ? `${groupData.references.length} DOSSIERS` : "DOSSIER SEUL"}
REFERENCES     : ${esc(groupData ? groupData.references.join(" / ") : (dossier.reference_dossier || ""))}
DESTINATAIRE   : ${esc(nom)}
MONTANT        : ${esc(groupData ? formatMoney(groupData.situation?.totalRestantDu || 0) : solde)}
ENVIRONNEMENT  : ${envLabel}
ENVOI REEL     : NON
EMAIL DEBITEUR   : ${emailDebiteur ? esc(String(dossier.debiteurs?.email || "")) : "NON"}

LE COURRIER SERA CREE CHEZ PINGEN AVEC AUTO_SEND = FALSE.${emailDebiteur ? "\nLE MEME PDF SERA ENVOYE AU DEBITEUR PAR EMAIL." : ""}
AUCUN COURRIER POSTAL REEL NE SERA ENVOYE EN STAGING.${message ? `

${message}` : ""}`,
            "CONFIRMER LA TRANSMISSION ? O/N > ",
            { maxLength: 3 }
        );

        attendreEntree(input, async (choix) => {
            if (choix === "N" || choix === "NON" || choix === "0" || choix === "X") {
                renderMessage(context.screen, "COUR", "TRANSMISSION PINGEN ANNULEE.");
                return;
            }
            if (choix !== "O" && choix !== "OUI") {
                afficherConfirmationPingen(type, "REPONSE ATTENDUE : O OU N.", emailDebiteur, corpsLibre, groupData);
                return;
            }

            context.screen.innerHTML = `
                <section class="cour-as400">
                    <pre class="terminal-table">POREC V2 - TRANSMISSION PINGEN
────────────────────────────────────────────────────────────

GENERATION PDF ................ EN COURS
TRANSFERT PINGEN .............. EN ATTENTE
CREATION DU COURRIER .......... EN ATTENTE${emailDebiteur ? "\nEMAIL DEBITEUR ................ EN ATTENTE" : ""}</pre>
                </section>
            `;

            const result = await transmettreCourrierPingen({
                dossierId: dossier.id,
                typeCode: type.code,
                emailDebiteur,
                corpsLibre,
                groupMode: Boolean(groupData)
            });

            if (result.error) {
                renderMessage(context.screen, "COUR - PINGEN", result.error);
                return;
            }

            if (groupData) await basculerGroupeNouveauVersAmiable(context, groupData.dossiers, dossier.reference_dossier);
            else await basculerNouveauVersAmiable(context, dossier);

            const p = result.data || {};
            const inputFin = renderTerminal(
`POREC V2 - TRANSMISSION PINGEN
────────────────────────────────────────────────────────────

GENERATION PDF ................ OK
TRANSFERT PINGEN .............. OK
CREATION DU COURRIER .......... OK${emailDebiteur ? `\nEMAIL DEBITEUR ................ ${p.emailOk ? "OK" : "ECHEC"}` : ""}

COURRIER CREE DANS PINGEN${emailDebiteur ? (p.emailOk ? "\nPDF ENVOYE AU DEBITEUR PAR EMAIL" : `\nEMAIL NON TRANSMIS : ${esc(p.emailError || "ERREUR EMAIL")}`) : ""}

PORTEE     : ${groupData ? `${groupData.references.length} DOSSIERS` : `DOSSIER ${esc(dossier.reference_dossier || "")}`}
LETTER ID  : ${esc(p.letterId || "-")}
STATUT     : ${esc(p.status || "-")}
AUTO_SEND  : FALSE
ENVOI REEL : NON

OPERATION TERMINEE`,
                "APPUYEZ SUR ENTREE POUR CONTINUER > ",
                { maxLength: 1 }
            );

            inputFin?.addEventListener("keydown", (event) => {
                if (event.key !== "Enter") return;
                event.preventDefault();
                renderMessage(
                    context.screen,
                    "COURRIER CREE CHEZ PINGEN",
                    groupData ? `${type.libelle} MULTI-FACTURES - ${groupData.references.length} DOSSIERS. LETTER ID ${p.letterId || "-"}.` : `${type.libelle} - DOSSIER ${dossier.reference_dossier}. LETTER ID ${p.letterId || "-"}.`
                );
            });
        });
    };

    afficherMenuTypes();
}

/*
 * RAPPROCHEMENT MANUEL DES PAIEMENTS CENTRALPAY PUBLICS
 *
 * RAPP affiche les paiements encaisses qui n'ont pas pu etre rattaches
 * automatiquement a un dossier POREC. L'operateur choisit une ligne,
 * saisit la bonne reference dossier et confirme l'imputation.
 */
async function handleRapp(context) {
    renderMessage(context.screen, "RAPP", "CHARGEMENT DES PAIEMENTS A RAPPROCHER...");

    const result = await getRapprochementsCentralPay();
    if (result.error) {
        renderMessage(context.screen, "RAPP", result.error);
        return;
    }

    const paiements = result.data || [];
    if (!paiements.length) {
        renderMessage(context.screen, "RAPP", "AUCUN PAIEMENT CENTRALPAY A RAPPROCHER.");
        return;
    }

    const options = paiements.map((p, index) => {
        const date = formatDate(p.paid_at || p.created_at);
        const ref = String(p.reference_saisie || "-");
        const email = String(p.email || "-");
        return `<option value="${rappEscape(p.id)}">${index + 1}. ${rappEscape(date)} - ${rappEscape(formatMoney(p.montant))} - REF SAISIE ${rappEscape(ref)} - ${rappEscape(email)}</option>`;
    }).join("");

    context.screen.innerHTML = `
        <section>
            <h2>RAPP - PAIEMENTS A RAPPROCHER</h2>
            <form id="rapp-form" class="terminal-form">
                <label>PAIEMENT</label>
                <select name="paiement_id" required>${options}</select>

                <label>REFERENCE DU DOSSIER POREC</label>
                <input name="reference_dossier" type="text" autocomplete="off" required placeholder="EX. 524">

                <label>CONFIRMER L'IMPUTATION (OUI)</label>
                <input name="confirmation" type="text" autocomplete="off" required placeholder="OUI">

                <div class="form-actions">
                    <button type="submit">IMPUTER</button>
                </div>
            </form>
        </section>
    `;

    const form = context.screen.querySelector("#rapp-form");
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const values = Object.fromEntries(new FormData(form).entries());
        const confirmation = String(values.confirmation || "").trim().toUpperCase();
        if (confirmation !== "O" && confirmation !== "OUI") {
            renderMessage(context.screen, "RAPP", "IMPUTATION NON CONFIRMEE.");
            return;
        }

        const paiement = paiements.find((p) => String(p.id) === String(values.paiement_id));
        if (!paiement) {
            renderMessage(context.screen, "RAPP", "PAIEMENT A RAPPROCHER INTROUVABLE.");
            return;
        }

        const reference = String(values.reference_dossier || "").trim();
        if (!reference) {
            renderMessage(context.screen, "RAPP", "REFERENCE DOSSIER OBLIGATOIRE.");
            return;
        }

        const ok = window.confirm(
            `Imputer le paiement CentralPay de ${formatMoney(paiement.montant)} au dossier ${reference} ?`
        );
        if (!ok) return;

        renderMessage(context.screen, "RAPP", `IMPUTATION DE ${formatMoney(paiement.montant)} AU DOSSIER ${reference}...`);
        const imputation = await imputerRapprochementCentralPay({
            paiementPublicId: paiement.id,
            referenceDossier: reference
        });

        if (imputation.error) {
            renderMessage(context.screen, "RAPP", imputation.error);
            return;
        }

        renderMessage(
            context.screen,
            "RAPPROCHEMENT EFFECTUE",
            `${formatMoney(paiement.montant)} IMPUTE AU DOSSIER ${imputation.data?.referenceDossier || reference}.`
        );
    });
}

function rappEscape(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/*
 * LIEN DE PAIEMENT CB POUR UN MONTANT CONVENU
 *
 * Usage : CB 150
 *
 * Le montant saisi peut être inférieur au solde restant dû.
 * Le paiement n'est PAS enregistré dans POREC à ce stade :
 * seule une PaymentRequest CentralPay et son lien court sont créés.
 * L'utilisateur valide ensuite l'envoi du SMS dans l'écran de prévisualisation.
 */
async function handleCb(args, context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(
            context.screen,
            "CB",
            "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT."
        );
        return;
    }

    const montant = Number(
        String(args[0] || "")
            .trim()
            .replace(",", ".")
    );

    if (!Number.isFinite(montant) || montant <= 0) {
        renderMessage(
            context.screen,
            "CB",
            "SYNTAXE : CB [MONTANT]. EXEMPLE : CB 150"
        );
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);

    if (paiements.error) {
        renderMessage(
            context.screen,
            "CB",
            paiements.error
        );
        return;
    }

    const situation = calculerSituationFinanciere(
        dossier,
        paiements.data || []
    );

    const soldeRestant = Number(
        situation?.totalRestantDu || 0
    );

    if (soldeRestant <= 0.005) {
        renderMessage(
            context.screen,
            "CB",
            "LE DOSSIER EST DEJA SOLDE. AUCUN LIEN DE PAIEMENT NE PEUT ETRE CREE."
        );
        return;
    }

    if (montant > soldeRestant + 0.005) {
        renderMessage(
            context.screen,
            "CB",
            `LE MONTANT DU LIEN (${formatMoney(montant)}) NE PEUT PAS DEPASSER LE SOLDE RESTANT DU (${formatMoney(soldeRestant)}).`
        );
        return;
    }

    renderMessage(
        context.screen,
        "CB",
        `CREATION DU LIEN CENTRALPAY DE ${formatMoney(montant)}...`
    );

    const centralPay = await createCentralPayLink({
        dossier,
        situation,
        montant
    });

    if (
        centralPay.error ||
        !centralPay.smsUrl ||
        !centralPay.shortUrl
    ) {
        renderMessage(
            context.screen,
            "CB",
            `LIEN DE PAIEMENT NON CREE : ${
                centralPay.error ||
                "ERREUR CENTRALPAY."
            }`
        );
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "CB",
        libelle: `LIEN CB CREE ${formatMoney(montant)}`,
        detail: `PAYMENTREQUEST ${centralPay.paymentRequestId || ""} - ${centralPay.shortUrl}`.trim(),
        utilisateurId: context.user?.id
    });

    const debiteur = dossier.debiteurs || {};
    const telephone =
        debiteur.telephone_mobile ||
        debiteur.telephone_fixe ||
        "";

    const modeleCb = {
        id: null,
        code_modele: "CB",
        libelle: "LIEN DE PAIEMENT CB - SMS + EMAIL"
    };

    const message =
        `RECOVIA - Dossier ${dossier.reference_dossier || ""}. ` +
        `Montant convenu : ${formatMoney(montant)}. ` +
        `Paiement sécurisé : ${centralPay.smsUrl}`;

    openSmsPreviewForm(
        context,
        dossier,
        modeleCb,
        telephone,
        message,
        async (formValues, submitContext) => {
            const smsResult = await submitSmsEnvoi(
                formValues,
                submitContext,
                dossier,
                modeleCb
            );

            if (!smsResult?.ok) {
                return;
            }

            const emailDestinataire = String(
                debiteur.email || debiteur.email_principal || ""
            ).trim();

            const sujet =
                `Lien de paiement sécurisé - dossier ${dossier.reference_dossier || ""}`;

            const contenu =
                `Madame, Monsieur,

` +
                `Vous trouverez ci-dessous le lien de paiement sécurisé correspondant à votre dossier ${dossier.reference_dossier || ""}.

` +
                `Montant convenu : ${formatMoney(montant)}.

` +
                `Vous pouvez procéder au règlement en cliquant sur le bouton de paiement sécurisé figurant dans cet email.

` +
                `Pour toute question, vous pouvez contacter RECOVIA au 01 75 43 88 22.

` +
                `Cordialement,
Service recouvrement
RECOVIA`;

            const emailResult = await sendEmailDossier({
                dossier,
                modele: modeleCb,
                emailDestinataire,
                sujet,
                contenu,
                montantDu: String(soldeRestant),
                situation,
                paymentUrlOverride: centralPay.shortUrl,
                montantPaiementOverride: montant
            });

            if (emailResult.error) {
                await addHistorique({
                    dossierId: dossier.id,
                    typeEvenement: "EMAIL",
                    libelle: `EMAIL LIEN CB EN ECHEC ${formatMoney(montant)}`,
                    detail: `DESTINATAIRE ${emailDestinataire} - ${emailResult.error}`.trim(),
                    utilisateurId: submitContext.user?.id
                });

                renderMessage(
                    submitContext.screen,
                    "LIEN CB - ENVOI PARTIEL",
                    `SMS : OK - ${String(formValues.telephone || "").trim()}
EMAIL : ECHEC - ${emailResult.error}
MONTANT : ${formatMoney(montant)}
LIEN : ${centralPay.shortUrl}`
                );
                return;
            }

            const emailStatut = emailResult.queued
                ? "PROGRAMME"
                : "ENVOYE";

            await addHistorique({
                dossierId: dossier.id,
                typeEvenement: "EMAIL",
                libelle: `EMAIL LIEN CB ${emailStatut} ${formatMoney(montant)}`,
                detail: `DESTINATAIRE ${emailDestinataire} - LIEN DE PAIEMENT CB`.trim(),
                utilisateurId: submitContext.user?.id
            });

            renderMessage(
                submitContext.screen,
                "LIEN CB TRANSMIS",
                `SMS : OK - ${String(formValues.telephone || "").trim()}
EMAIL : ${emailStatut} - ${emailDestinataire}
MONTANT : ${formatMoney(montant)}
LIEN : ${centralPay.shortUrl}`
            );
        },
        (cancelContext) => {
            cancelContext.screen.innerHTML = `
                <section>
                    <h2>LIEN CB CREE</h2>
                    <pre class="terminal-table">DOSSIER : ${dossier.reference_dossier || ""}
MONTANT : ${formatMoney(montant)}

LIEN : ${centralPay.shortUrl}

ENVOIS SMS ET EMAIL ANNULES.
LE LIEN RESTE VALIDE ET PEUT ETRE COPIE.</pre>
                </section>
            `;
        },
        {
            confirmationText: "F10 PUIS O POUR ENVOYER LE SMS ET L'EMAIL."
        }
    );
}

async function handleEmailTypes(context) {
    context.setView("emailTypes");

    context.screen.innerHTML = `
        <section>
            <h2>MAILTYPES</h2>
            <p>CHARGEMENT DES MODELES EMAIL...</p>
        </section>
    `;

    const result = await getEmailModeles(context.getPage("emailTypes"));

    if (result.error) {
        renderMessage(context.screen, "MAILTYPES", result.error);
        return;
    }

    renderEmailTypesScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleEmailTypesNext(context) {
    const nextPage = context.getPage("emailTypes") + 1;
    context.setPage("emailTypes", nextPage);
    await handleEmailTypes(context);
}

async function handleEmailTypesPrev(context) {
    const prevPage = Math.max(1, context.getPage("emailTypes") - 1);
    context.setPage("emailTypes", prevPage);
    await handleEmailTypes(context);
}

async function handleAddEmailModele(context) {
    openEmailModeleForm(
        context,
        "ADDMAIL",
        null,
        async (values, submitContext) => {
            await submitAddEmailModele(values, submitContext);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDMAIL", "CREATION MODELE EMAIL ANNULEE.");
        }
    );
}

async function submitAddEmailModele(values, context) {
    const result = await createEmailModele(values);

    if (result.error) {
        renderMessage(context.screen, "ADDMAIL", result.error);
        return;
    }

    context.resetPage("emailTypes");
    await handleEmailTypes(context);
}

async function handleModEmailModele(args, context) {
    const code = args[0];

    if (!code) {
        renderMessage(context.screen, "MODMAIL", "SYNTAXE : MODMAIL [CODE_MODELE]");
        return;
    }

    const result = await getEmailModeleByCode(code);

    if (result.error) {
        renderMessage(context.screen, "MODMAIL", result.error);
        return;
    }

    openEmailModeleForm(
        context,
        "MODMAIL",
        result.data,
        async (values, submitContext) => {
            await submitModEmailModele(values, submitContext, result.data.id);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODMAIL", "MODIFICATION MODELE EMAIL ANNULEE.");
        }
    );
}

async function submitModEmailModele(values, context, modeleId) {
    const result = await updateEmailModele(modeleId, values);

    if (result.error) {
        renderMessage(context.screen, "MODMAIL", result.error);
        return;
    }

    context.resetPage("emailTypes");
    await handleEmailTypes(context);
}

async function handleDelEmailModele(args, context) {
    const code = args[0];

    if (!code) {
        renderMessage(context.screen, "DELMAIL", "SYNTAXE : DELMAIL [CODE_MODELE]");
        return;
    }

    const result = await getEmailModeleByCode(code);

    if (result.error) {
        renderMessage(context.screen, "DELMAIL", result.error);
        return;
    }

    openDelEmailModeleForm(
        context,
        result.data,
        async (values, submitContext) => {
            await submitDelEmailModele(values, submitContext, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELMAIL", "DESACTIVATION MODELE EMAIL ANNULEE.");
        }
    );
}

async function submitDelEmailModele(values, context, modele) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELMAIL", "DESACTIVATION NON CONFIRMEE.");
        return;
    }

    const result = await disableEmailModele(modele.id);

    if (result.error) {
        renderMessage(context.screen, "DELMAIL", result.error);
        return;
    }

    context.resetPage("emailTypes");
    await handleEmailTypes(context);
}


async function handleMail(args, context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "MAIL", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const codeModele = String(args[0] || "").trim().toUpperCase();

    if (!codeModele) {
        renderMessage(context.screen, "MAIL", "SYNTAXE : MAIL [CODE_MODELE]");
        return;
    }

    const emailDestinataire = String(dossier.debiteurs?.email || "").trim();

    if (!emailDestinataire) {
        renderMessage(context.screen, "MAIL", "AUCUN EMAIL DEBITEUR RENSEIGNE SUR CE DOSSIER.");
        return;
    }

    const modele = await getEmailModeleByCode(codeModele);

    if (modele.error) {
        renderMessage(context.screen, "MAIL", modele.error);
        return;
    }

    if (modele.data.actif === false) {
        renderMessage(context.screen, "MAIL", "MODELE EMAIL INACTIF.");
        return;
    }

    const lancer = async (portee = "DOSSIER", groupContext = null) => {
        let dossierCible = dossier;
        let situation;

        if (portee === "GROUPE") {
            dossierCible = groupContext.dossierSynthese;
            situation = groupContext.situation;
        } else {
            const paiements = await getPaiementsByDossier(dossier.id);
            situation = calculerSituationFinanciere(dossier, paiements.data || []);
        }

        const payload = buildEmailPayload({
            dossier: dossierCible,
            modele: modele.data,
            situation
        });

        openEmailPreviewForm(
            context,
            dossierCible,
            modele.data,
            emailDestinataire,
            payload.sujet,
            payload.contenu,
            async (formValues, submitContext) => {
                const destinataire = String(formValues.email || "").trim();
                const sujet = String(formValues.sujet || "").trim();
                const contenu = String(formValues.contenu || "").trim();

                if (!destinataire || !sujet || !contenu) {
                    renderMessage(submitContext.screen, "MAIL", "EMAIL, SUJET ET MESSAGE OBLIGATOIRES.");
                    return;
                }

                const dossierTrace = portee === "GROUPE"
                    ? { ...dossierCible, id: dossier.id }
                    : dossier;

                const result = await sendEmailDossier({
                    dossier: dossierTrace,
                    modele: modele.data,
                    emailDestinataire: destinataire,
                    sujet,
                    contenu,
                    montantDu: payload.variables?.MONTANT_DU || "",
                    situation,
                    skipPaymentLink: portee === "GROUPE"
                });

                if (result.error) {
                    renderMessage(submitContext.screen, "MAIL", result.error);
                    return;
                }

                const programme = result.queued ? formatProgrammeEmail(result.programmePour) : "";

                if (portee === "GROUPE") {
                    const refs = groupContext.references.join(" / ");
                    await basculerGroupeNouveauVersAmiable(
                        submitContext,
                        groupContext.dossiers,
                        dossier.reference_dossier
                    );
                    const hist = await addHistoriqueGroupe({
                        dossierActifId: dossier.id,
                        dossierIds: groupContext.dossierIds,
                        typeEvenement: "EMAIL",
                        libelle: result.queued
                            ? `EMAIL GROUPE PROGRAMME ${modele.data.code_modele || ""}`
                            : `EMAIL GROUPE ENVOYE ${modele.data.code_modele || ""}`,
                        detail: result.queued
                            ? `ACTION GROUPE - DOSSIERS ${refs} - DESTINATAIRE ${destinataire} - MODELE ${modele.data.code_modele || ""} - ENVOI PREVU ${programme}`.trim()
                            : `ACTION GROUPE - DOSSIERS ${refs} - DESTINATAIRE ${destinataire} - MODELE ${modele.data.code_modele || ""}`.trim(),
                        utilisateurId: submitContext.user?.id
                    });
                    if (hist.error) {
                        renderMessage(submitContext.screen, "MAIL", hist.error);
                        return;
                    }

                    renderMessage(
                        submitContext.screen,
                        result.queued ? "EMAIL GROUPE PROGRAMME" : "EMAIL GROUPE ENVOYE",
                        `${destinataire} - ${groupContext.references.length} DOSSIERS - MODELE ${modele.data.code_modele || ""}${result.queued ? ` - ENVOI PREVU ${programme}` : ""}\n\nNOTE : AUCUN LIEN DE PAIEMENT N'EST AJOUTE AUX EMAILS GROUPE POUR EVITER UNE IMPUTATION AMBIGUE.`
                    );
                    return;
                }

                await addHistorique({
                    dossierId: dossier.id,
                    typeEvenement: "EMAIL",
                    libelle: result.queued
                        ? `EMAIL PROGRAMME ${modele.data.code_modele || ""}`
                        : `EMAIL ENVOYE ${modele.data.code_modele || ""}`,
                    detail: result.queued
                        ? `DESTINATAIRE ${destinataire} - MODELE ${modele.data.code_modele || ""} - ENVOI PREVU ${programme}`.trim()
                        : `DESTINATAIRE ${destinataire} - MODELE ${modele.data.code_modele || ""}`.trim(),
                    utilisateurId: submitContext.user?.id
                });

                await basculerNouveauVersAmiable(submitContext, dossier);

                renderMessage(
                    submitContext.screen,
                    result.queued ? "EMAIL PROGRAMME" : "EMAIL ENVOYE",
                    result.queued
                        ? `${destinataire} - MODELE ${modele.data.code_modele || ""} - ENVOI PREVU ${programme}`
                        : `${destinataire} - MODELE ${modele.data.code_modele || ""}`
                );
            },
            (cancelContext) => {
                renderMessage(cancelContext.screen, "MAIL", "ENVOI EMAIL ANNULE.");
            }
        );
    };

    if (!dossier.groupe_dossier_id) {
        await lancer();
        return;
    }

    const group = await buildGroupActionContext(dossier);
    if (group.error) {
        renderMessage(context.screen, "MAIL", group.error);
        return;
    }

    openGroupScopeForm(
        context,
        dossier,
        group.data,
        "MAIL",
        async (values, submitContext) => {
            const portee = String(values.portee || "1").trim() === "2" ? "GROUPE" : "DOSSIER";
            if (portee === "GROUPE" && group.data.multiCreancier) {
                renderMessage(
                    submitContext.screen,
                    "MAIL",
                    "RELANCE GROUPE NON DISPONIBLE : LES DOSSIERS DU GROUPE APPARTIENNENT A PLUSIEURS CREANCIERS."
                );
                return;
            }
            await lancer(portee, group.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MAIL", "ENVOI EMAIL ANNULE.");
        }
    );
}



async function handleMailProfessionnel(args, context, typeDestinataire) {
    const dossier = context.currentDossier;
    const command = `MAIL${typeDestinataire === "CLIENT" ? "CLI" : typeDestinataire === "HUISSIER" ? "HUI" : "AVO"}`;

    if (!dossier) {
        renderMessage(context.screen, command, "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const data = await chargerDonneesMailProfessionnel(dossier, typeDestinataire);

    if (data.error) {
        renderMessage(context.screen, command, data.error);
        return;
    }

    const codeModele = String(args[0] || "").trim().toUpperCase();

    let modeleSelectionne = null;
    let sujet = `${dossier.reference_dossier || ""} - `.trim();
    let contenu = "";

    if (codeModele) {
        const modele = await getEmailProfessionnelModeleByCode(codeModele);

        if (modele.error) {
            renderMessage(context.screen, command, modele.error);
            return;
        }

        if (modele.data.actif === false) {
            renderMessage(context.screen, command, "MODELE EMAIL INACTIF.");
            return;
        }

        modeleSelectionne = modele.data;
        const payload = buildEmailProfessionnelPayload({
            dossier,
            modele: modele.data,
            judiciaire: data.judiciaire,
            contentieux: data.contentieux,
            situation: data.situation
        });

        sujet = prefixerObjetAvecReferenceDossier(dossier.reference_dossier, payload.sujet);
        contenu = payload.contenu;
    }

    openEmailDirectForm(
        context,
        command,
        {
            destinataire: data.emailDestinataire,
            sujet,
            contenu,
            typeDestinataire
        },
        async (values, submitContext) => {
            await envoyerMailProfessionnel({
                context: submitContext,
                command,
                dossier,
                judiciaire: data.judiciaire,
                contentieux: data.contentieux,
                typeDestinataire,
                emailDestinataire: values.destinataire,
                sujet: values.sujet,
                contenu: values.contenu,
                modele: modeleSelectionne,
                situation: data.situation
            });
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, command, "ENVOI EMAIL ANNULE.");
        }
    );
}

function prefixerObjetAvecReferenceDossier(referenceDossier, sujet) {
    const reference = String(referenceDossier || "").trim();
    const objet = String(sujet || "").trim();

    if (!reference) {
        return objet;
    }

    if (!objet) {
        return `${reference} - `;
    }

    if (objet.toUpperCase().startsWith(reference.toUpperCase())) {
        return objet;
    }

    return `${reference} - ${objet}`;
}

async function chargerDonneesMailProfessionnel(dossier, typeDestinataire) {
    const paiements = await getPaiementsByDossier(dossier.id);
    const situation = calculerSituationFinanciere(dossier, paiements.data || []);
    const judiciaireResult = await getJudiciaireByDossier(dossier.id);
    const contentieuxResult = await getContentieuxByDossier(dossier.id);

    const judiciaire = judiciaireResult.data || null;
    const contentieux = contentieuxResult.data || null;

    let emailDestinataire = "";

    if (typeDestinataire === "CLIENT") {
        emailDestinataire = String(dossier.creanciers?.email || "").trim();

        if (!emailDestinataire) {
            return { error: "AUCUN EMAIL CLIENT / CREANCIER RENSEIGNE SUR CE DOSSIER." };
        }
    }

    if (typeDestinataire === "HUISSIER") {
        emailDestinataire = String(judiciaire?.huissiers?.email || contentieux?.huissiers?.email || "").trim();

        if (!emailDestinataire) {
            return { error: "AUCUN EMAIL HUISSIER RENSEIGNE SUR CE DOSSIER." };
        }
    }

    if (typeDestinataire === "AVOCAT") {
        emailDestinataire = String(judiciaire?.avocats?.email || "").trim();

        if (!emailDestinataire) {
            return { error: "AUCUN EMAIL AVOCAT RENSEIGNE SUR CE DOSSIER." };
        }
    }

    return {
        error: null,
        emailDestinataire,
        judiciaire,
        contentieux,
        situation
    };
}

async function envoyerMailProfessionnel({
    context,
    command,
    dossier,
    judiciaire,
    contentieux,
    typeDestinataire,
    emailDestinataire,
    sujet,
    contenu,
    modele,
    situation
}) {
    const subject = String(sujet || "").trim();

    if (!String(emailDestinataire || "").trim() || !subject || !String(contenu || "").trim()) {
        renderMessage(context.screen, command, "DESTINATAIRE, OBJET ET CORPS DU MAIL OBLIGATOIRES.");
        return;
    }

    const result = await sendEmailProfessionnelDossier({
        dossier,
        judiciaire,
        contentieux,
        modele,
        emailDestinataire,
        typeDestinataire,
        sujet: subject,
        contenu,
        situation
    });

    if (result.error) {
        renderMessage(context.screen, command, result.error);
        return;
    }

    const programme = result.queued ? formatProgrammeEmail(result.programmePour) : "";

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "EMAIL",
        libelle: result.queued
            ? `EMAIL PROGRAMME ${labelDestinataireEmail(typeDestinataire)} : ${subject}`.trim()
            : `EMAIL ENVOYE ${labelDestinataireEmail(typeDestinataire)} : ${subject}`.trim(),
        detail: result.queued
            ? `DESTINATAIRE ${emailDestinataire} - ENVOI PREVU ${programme}`.trim()
            : `DESTINATAIRE ${emailDestinataire}`.trim(),
        utilisateurId: context.user?.id
    });

    renderMessage(
        context.screen,
        result.queued ? "EMAIL PROGRAMME" : "EMAIL ENVOYE",
        result.queued
            ? `${labelDestinataireEmail(typeDestinataire)} - ${emailDestinataire} - ENVOI PREVU ${programme}`
            : `${labelDestinataireEmail(typeDestinataire)} - ${emailDestinataire} - ${subject}`
    );
}

function formatProgrammeEmail(value) {
    if (!value) return "08:00";

    try {
        return new Date(value).toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    } catch {
        return String(value);
    }
}

function labelDestinataireEmail(typeDestinataire) {
    if (typeDestinataire === "CLIENT") return "CLIENT";
    if (typeDestinataire === "HUISSIER") return "HUISSIER";
    if (typeDestinataire === "AVOCAT") return "AVOCAT";
    return "PRO";
}

async function handleHuissiers(context) {
    context.setView("huissiers");

    context.screen.innerHTML = `
        <section>
            <h2>HUISSIERS</h2>
            <p>CHARGEMENT DES HUISSIERS...</p>
        </section>
    `;

    const result = await getHuissiers(context.getPage("huissiers"));

    if (result.error) {
        renderMessage(context.screen, "HUISSIERS", result.error);
        return;
    }

    renderHuissiersScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleHuissiersNext(context) {
    const nextPage = context.getPage("huissiers") + 1;
    context.setPage("huissiers", nextPage);
    await handleHuissiers(context);
}

async function handleHuissiersPrev(context) {
    const prevPage = Math.max(1, context.getPage("huissiers") - 1);
    context.setPage("huissiers", prevPage);
    await handleHuissiers(context);
}

async function handleHuissier(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "HUI", "SYNTAXE : HUI [REFERENCE_HUISSIER]");
        return;
    }

    const result = await getHuissierByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "HUI", result.error);
        return;
    }

    renderHuissierScreen(context.screen, result.data);
}

async function handleAddHuissier(context) {
    openHuissierForm(
        context,
        "ADDHUI",
        null,
        async (values, submitContext) => {
            await submitAddHuissier(values, submitContext);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDHUI", "CREATION HUISSIER ANNULEE.");
        }
    );
}

async function submitAddHuissier(values, context) {
    const result = await createHuissier(values);

    if (result.error) {
        renderMessage(context.screen, "ADDHUI", result.error);
        return;
    }

    const huissier = await getHuissierByReference(result.data.reference_huissier);

    if (huissier.error) {
        renderMessage(context.screen, "ADDHUI", huissier.error);
        return;
    }

    renderHuissierScreen(context.screen, huissier.data);
}

async function handleModHuissier(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "MODHUI", "SYNTAXE : MODHUI [REFERENCE_HUISSIER]");
        return;
    }

    const result = await getHuissierByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "MODHUI", result.error);
        return;
    }

    openHuissierForm(
        context,
        "MODHUI",
        result.data,
        async (values, submitContext) => {
            await submitModHuissier(values, submitContext, result.data.id);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODHUI", "MODIFICATION HUISSIER ANNULEE.");
        }
    );
}

async function submitModHuissier(values, context, huissierId) {
    const result = await updateHuissier(huissierId, values);

    if (result.error) {
        renderMessage(context.screen, "MODHUI", result.error);
        return;
    }

    const huissier = await getHuissierByReference(result.data.reference_huissier);

    if (huissier.error) {
        renderMessage(context.screen, "MODHUI", huissier.error);
        return;
    }

    renderHuissierScreen(context.screen, huissier.data);
}

async function handleDelHuissier(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "DELHUI", "SYNTAXE : DELHUI [REFERENCE_HUISSIER]");
        return;
    }

    const result = await getHuissierByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "DELHUI", result.error);
        return;
    }

    openDelHuissierForm(
        context,
        result.data,
        async (values, submitContext) => {
            await submitDelHuissier(values, submitContext, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELHUI", "SUPPRESSION HUISSIER ANNULEE.");
        }
    );
}

async function submitDelHuissier(values, context, huissier) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELHUI", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    const result = await deleteHuissier(huissier.id);

    if (result.error) {
        renderMessage(context.screen, "DELHUI", result.error);
        return;
    }

    context.resetPage("huissiers");
    await handleHuissiers(context);
}


async function handleJudiciaire(context) {
    context.setView("judiciaire");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "JUD", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getJudiciaireByDossier(dossier.id);

    if (result.error) {
        renderMessage(context.screen, "JUD", result.error);
        return;
    }

    renderJudiciaireScreen(context.screen, dossier, result.data);
}

async function handleAddJudiciaire(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "ADDJUD", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const existing = await getJudiciaireByDossier(dossier.id);

    if (existing.error) {
        renderMessage(context.screen, "ADDJUD", existing.error);
        return;
    }

    if (existing.data) {
        renderMessage(context.screen, "ADDJUD", "UN SUIVI JUDICIAIRE EXISTE DEJA POUR CE DOSSIER. UTILISEZ MODJUD.");
        return;
    }

    const tribunaux = await getTribunalOptions();

    if (tribunaux.error) {
        renderMessage(context.screen, "ADDJUD", tribunaux.error);
        return;
    }

    if (!tribunaux.options.length) {
        renderMessage(context.screen, "ADDJUD", "AUCUN TRIBUNAL ACTIF. UTILISEZ ADDTRIB OU TRIBUNAUX.");
        return;
    }

    const avocats = await getAvocatOptions();

    if (avocats.error) {
        renderMessage(context.screen, "ADDJUD", avocats.error);
        return;
    }

    const huissiers = await getHuissierOptions();

    if (huissiers.error) {
        renderMessage(context.screen, "ADDJUD", huissiers.error);
        return;
    }

    openJudiciaireForm(
        context,
        "ADDJUD",
        dossier,
        null,
        tribunaux.options,
        avocats.options,
        huissiers.options,
        async (values, submitContext) => {
            await submitAddJudiciaire(values, submitContext, dossier);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDJUD", "CREATION SUIVI JUDICIAIRE ANNULEE.");
        }
    );
}

async function submitAddJudiciaire(values, context, dossier) {
    const tribunalReference = String(values.reference_tribunal || "").trim().toUpperCase();
    const tribunal = await getTribunalByReference(tribunalReference);

    if (tribunal.error || !tribunal.data) {
        renderMessage(context.screen, "ADDJUD", "TRIBUNAL INTROUVABLE.");
        return;
    }

    let avocatId = null;
    let avocatDetail = "";
    const avocatReference = String(values.reference_avocat || "").trim().toUpperCase();

    if (avocatReference) {
        const avocat = await getAvocatByReference(avocatReference);

        if (avocat.error || !avocat.data) {
            renderMessage(context.screen, "ADDJUD", "AVOCAT INTROUVABLE.");
            return;
        }

        avocatId = avocat.data.id;
        avocatDetail = `${avocat.data.reference_avocat || ""} ${avocat.data.nom || ""}`.trim();
    }

    let huissierId = null;
    let huissierDetail = "";
    const huissierReference = String(values.reference_huissier || "").trim().toUpperCase();

    if (huissierReference) {
        const huissier = await getHuissierByReference(huissierReference);

        if (huissier.error || !huissier.data) {
            renderMessage(context.screen, "ADDJUD", "HUISSIER INTROUVABLE.");
            return;
        }

        huissierId = huissier.data.id;
        huissierDetail = `${huissier.data.reference_huissier || ""} ${huissier.data.nom || ""}`.trim();
    }

    const creation = await createJudiciaireDossier({
        dossierId: dossier.id,
        tribunalId: tribunal.data.id,
        avocatId,
        huissierId,
        typeProcedure: values.type_procedure,
        statutJudiciaire: values.statut_judiciaire,
        dateDepot: dateOrNull(values.date_depot),
        referenceRg: values.reference_rg,
        dateAudience: dateOrNull(values.date_audience),
        decision: values.decision,
        dateDecision: dateOrNull(values.date_decision),
        titreExecutoire: yesNoToBoolean(values.titre_executoire),
        dateSignification: dateOrNull(values.date_signification),
        dateTitreExecutoire: dateOrNull(values.date_titre_executoire),
        dateExecution: dateOrNull(values.date_execution),
        typeExecution: values.type_execution,
        montantCondamnation: values.montant_condamnation,
        observations: values.observations
    });

    if (creation.error) {
        renderMessage(context.screen, "ADDJUD", creation.error);
        return;
    }

    const statutUpdate = await updateStatutDossier({
        dossierId: dossier.id,
        statutCode: "JUDICIAIRE"
    });

    if (statutUpdate.error) {
        renderMessage(context.screen, "ADDJUD", statutUpdate.error);
        return;
    }

    if (statutUpdate.data) {
        setContextDossier(context, statutUpdate.data);
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "JUD",
        libelle: "SUIVI JUDICIAIRE CREE",
        detail: `${String(values.type_procedure || "").toUpperCase()} - STATUT ${String(values.statut_judiciaire || "EN_PREPARATION").toUpperCase()} - ${tribunal.data.reference_tribunal || ""} ${avocatDetail} ${huissierDetail}`.trim(),
        utilisateurId: context.user?.id
    });

    const syncTaches = await synchroniserTachesJudiciaires({
        dossierId: dossier.id,
        judiciaire: creation.data,
        utilisateurId: context.user?.id
    });

    if (syncTaches.error) {
        renderMessage(context.screen, "ADDJUD", syncTaches.error);
        return;
    }

    const judiciaire = await getJudiciaireByDossier(dossier.id);
    renderJudiciaireScreen(context.screen, statutUpdate.data || dossier, judiciaire.data || creation.data);
}

async function handleModJudiciaire(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "MODJUD", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const existing = await getJudiciaireByDossier(dossier.id);

    if (existing.error) {
        renderMessage(context.screen, "MODJUD", existing.error);
        return;
    }

    if (!existing.data) {
        renderMessage(context.screen, "MODJUD", "AUCUN SUIVI JUDICIAIRE. UTILISEZ ADDJUD.");
        return;
    }

    const tribunaux = await getTribunalOptions();

    if (tribunaux.error) {
        renderMessage(context.screen, "MODJUD", tribunaux.error);
        return;
    }

    const avocats = await getAvocatOptions();

    if (avocats.error) {
        renderMessage(context.screen, "MODJUD", avocats.error);
        return;
    }

    const huissiers = await getHuissierOptions();

    if (huissiers.error) {
        renderMessage(context.screen, "MODJUD", huissiers.error);
        return;
    }

    openJudiciaireForm(
        context,
        "MODJUD",
        dossier,
        existing.data,
        tribunaux.options,
        avocats.options,
        huissiers.options,
        async (values, submitContext) => {
            await submitModJudiciaire(values, submitContext, dossier, existing.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODJUD", "MODIFICATION SUIVI JUDICIAIRE ANNULEE.");
        }
    );
}

async function submitModJudiciaire(values, context, dossier, judiciaire) {
    const tribunalReference = String(values.reference_tribunal || "").trim().toUpperCase();
    const tribunal = await getTribunalByReference(tribunalReference);

    if (tribunal.error || !tribunal.data) {
        renderMessage(context.screen, "MODJUD", "TRIBUNAL INTROUVABLE.");
        return;
    }

    let avocatId = null;
    let avocatDetail = "";
    const avocatReference = String(values.reference_avocat || "").trim().toUpperCase();

    if (avocatReference) {
        const avocat = await getAvocatByReference(avocatReference);

        if (avocat.error || !avocat.data) {
            renderMessage(context.screen, "MODJUD", "AVOCAT INTROUVABLE.");
            return;
        }

        avocatId = avocat.data.id;
        avocatDetail = `${avocat.data.reference_avocat || ""} ${avocat.data.nom || ""}`.trim();
    }

    let huissierId = null;
    let huissierDetail = "";
    const huissierReference = String(values.reference_huissier || "").trim().toUpperCase();

    if (huissierReference) {
        const huissier = await getHuissierByReference(huissierReference);

        if (huissier.error || !huissier.data) {
            renderMessage(context.screen, "MODJUD", "HUISSIER INTROUVABLE.");
            return;
        }

        huissierId = huissier.data.id;
        huissierDetail = `${huissier.data.reference_huissier || ""} ${huissier.data.nom || ""}`.trim();
    }

    const result = await updateJudiciaireDossier({
        judiciaireId: judiciaire.id,
        tribunalId: tribunal.data.id,
        avocatId,
        huissierId,
        typeProcedure: values.type_procedure,
        statutJudiciaire: values.statut_judiciaire,
        dateDepot: dateOrNull(values.date_depot),
        referenceRg: values.reference_rg,
        dateAudience: dateOrNull(values.date_audience),
        decision: values.decision,
        dateDecision: dateOrNull(values.date_decision),
        titreExecutoire: yesNoToBoolean(values.titre_executoire),
        dateSignification: dateOrNull(values.date_signification),
        dateTitreExecutoire: dateOrNull(values.date_titre_executoire),
        dateExecution: dateOrNull(values.date_execution),
        typeExecution: values.type_execution,
        montantCondamnation: values.montant_condamnation,
        observations: values.observations
    });

    if (result.error) {
        renderMessage(context.screen, "MODJUD", result.error);
        return;
    }

    const ancienStatutJudiciaire = String(judiciaire.statut_judiciaire || "EN_PREPARATION").toUpperCase();
    const nouveauStatutJudiciaire = String(values.statut_judiciaire || "EN_PREPARATION").toUpperCase();

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "JUD",
        libelle: "SUIVI JUDICIAIRE MODIFIE",
        detail: `${String(values.type_procedure || "").toUpperCase()} - STATUT ${nouveauStatutJudiciaire} - ${tribunal.data.reference_tribunal || ""} ${avocatDetail} ${huissierDetail}`.trim(),
        utilisateurId: context.user?.id
    });

    if (ancienStatutJudiciaire !== nouveauStatutJudiciaire) {
        await addHistorique({
            dossierId: dossier.id,
            typeEvenement: "JUD",
            libelle: `STATUT JUDICIAIRE : ${nouveauStatutJudiciaire}`,
            detail: `ANCIEN STATUT : ${ancienStatutJudiciaire}`,
            utilisateurId: context.user?.id
        });
    }

    const syncTaches = await synchroniserTachesJudiciaires({
        dossierId: dossier.id,
        judiciaire: result.data,
        previousJudiciaire: judiciaire,
        utilisateurId: context.user?.id
    });

    if (syncTaches.error) {
        renderMessage(context.screen, "MODJUD", syncTaches.error);
        return;
    }

    renderJudiciaireScreen(context.screen, dossier, result.data);
}

async function handleTribunaux(context) {
    context.setView("tribunaux");

    context.screen.innerHTML = `
        <section>
            <h2>TRIBUNAUX</h2>
            <p>CHARGEMENT DES TRIBUNAUX...</p>
        </section>
    `;

    const result = await getTribunaux(context.getPage("tribunaux"));

    if (result.error) {
        renderMessage(context.screen, "TRIBUNAUX", result.error);
        return;
    }

    renderTribunauxScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleTribunauxNext(context) {
    const nextPage = context.getPage("tribunaux") + 1;
    context.setPage("tribunaux", nextPage);
    await handleTribunaux(context);
}

async function handleTribunauxPrev(context) {
    const prevPage = Math.max(1, context.getPage("tribunaux") - 1);
    context.setPage("tribunaux", prevPage);
    await handleTribunaux(context);
}

async function handleTribunal(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "TRIB", "SYNTAXE : TRIB [REFERENCE_TRIBUNAL]");
        return;
    }

    const result = await getTribunalByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "TRIB", result.error);
        return;
    }

    renderTribunalScreen(context.screen, result.data);
}

async function handleAddTribunal(context) {
    openTribunalForm(
        context,
        "ADDTRIB",
        null,
        async (values, submitContext) => {
            await submitAddTribunal(values, submitContext);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDTRIB", "CREATION TRIBUNAL ANNULEE.");
        }
    );
}

async function submitAddTribunal(values, context) {
    const result = await createTribunal(values);

    if (result.error) {
        renderMessage(context.screen, "ADDTRIB", result.error);
        return;
    }

    const tribunal = await getTribunalByReference(result.data.reference_tribunal);

    if (tribunal.error) {
        renderMessage(context.screen, "ADDTRIB", tribunal.error);
        return;
    }

    renderTribunalScreen(context.screen, tribunal.data);
}

async function handleModTribunal(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "MODTRIB", "SYNTAXE : MODTRIB [REFERENCE_TRIBUNAL]");
        return;
    }

    const result = await getTribunalByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "MODTRIB", result.error);
        return;
    }

    openTribunalForm(
        context,
        "MODTRIB",
        result.data,
        async (values, submitContext) => {
            await submitModTribunal(values, submitContext, result.data.id);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODTRIB", "MODIFICATION TRIBUNAL ANNULEE.");
        }
    );
}

async function submitModTribunal(values, context, tribunalId) {
    const result = await updateTribunal(tribunalId, values);

    if (result.error) {
        renderMessage(context.screen, "MODTRIB", result.error);
        return;
    }

    const tribunal = await getTribunalByReference(result.data.reference_tribunal);

    if (tribunal.error) {
        renderMessage(context.screen, "MODTRIB", tribunal.error);
        return;
    }

    renderTribunalScreen(context.screen, tribunal.data);
}

async function handleDelTribunal(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "DELTRIB", "SYNTAXE : DELTRIB [REFERENCE_TRIBUNAL]");
        return;
    }

    const result = await getTribunalByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "DELTRIB", result.error);
        return;
    }

    openDelTribunalForm(
        context,
        result.data,
        async (values, submitContext) => {
            await submitDelTribunal(values, submitContext, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELTRIB", "SUPPRESSION TRIBUNAL ANNULEE.");
        }
    );
}

async function submitDelTribunal(values, context, tribunal) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELTRIB", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    const result = await deleteTribunal(tribunal.id);

    if (result.error) {
        renderMessage(context.screen, "DELTRIB", result.error);
        return;
    }

    context.resetPage("tribunaux");
    await handleTribunaux(context);
}

async function handleAvocats(context) {
    context.setView("avocats");

    context.screen.innerHTML = `
        <section>
            <h2>AVOCATS</h2>
            <p>CHARGEMENT DES AVOCATS...</p>
        </section>
    `;

    const result = await getAvocats(context.getPage("avocats"));

    if (result.error) {
        renderMessage(context.screen, "AVOCATS", result.error);
        return;
    }

    renderAvocatsScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleAvocatsNext(context) {
    const nextPage = context.getPage("avocats") + 1;
    context.setPage("avocats", nextPage);
    await handleAvocats(context);
}

async function handleAvocatsPrev(context) {
    const prevPage = Math.max(1, context.getPage("avocats") - 1);
    context.setPage("avocats", prevPage);
    await handleAvocats(context);
}

async function handleAvocat(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "AVO", "SYNTAXE : AVO [REFERENCE_AVOCAT]");
        return;
    }

    const result = await getAvocatByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "AVO", result.error);
        return;
    }

    renderAvocatScreen(context.screen, result.data);
}

async function handleAddAvocat(context) {
    openAvocatForm(
        context,
        "ADDAVO",
        null,
        async (values, submitContext) => {
            await submitAddAvocat(values, submitContext);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDAVO", "CREATION AVOCAT ANNULEE.");
        }
    );
}

async function submitAddAvocat(values, context) {
    const result = await createAvocat(values);

    if (result.error) {
        renderMessage(context.screen, "ADDAVO", result.error);
        return;
    }

    const avocat = await getAvocatByReference(result.data.reference_avocat);

    if (avocat.error) {
        renderMessage(context.screen, "ADDAVO", avocat.error);
        return;
    }

    renderAvocatScreen(context.screen, avocat.data);
}

async function handleModAvocat(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "MODAVO", "SYNTAXE : MODAVO [REFERENCE_AVOCAT]");
        return;
    }

    const result = await getAvocatByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "MODAVO", result.error);
        return;
    }

    openAvocatForm(
        context,
        "MODAVO",
        result.data,
        async (values, submitContext) => {
            await submitModAvocat(values, submitContext, result.data.id);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODAVO", "MODIFICATION AVOCAT ANNULEE.");
        }
    );
}

async function submitModAvocat(values, context, avocatId) {
    const result = await updateAvocat(avocatId, values);

    if (result.error) {
        renderMessage(context.screen, "MODAVO", result.error);
        return;
    }

    const avocat = await getAvocatByReference(result.data.reference_avocat);

    if (avocat.error) {
        renderMessage(context.screen, "MODAVO", avocat.error);
        return;
    }

    renderAvocatScreen(context.screen, avocat.data);
}

async function handleDelAvocat(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "DELAVO", "SYNTAXE : DELAVO [REFERENCE_AVOCAT]");
        return;
    }

    const result = await getAvocatByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "DELAVO", result.error);
        return;
    }

    openDelAvocatForm(
        context,
        result.data,
        async (values, submitContext) => {
            await submitDelAvocat(values, submitContext, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELAVO", "SUPPRESSION AVOCAT ANNULEE.");
        }
    );
}

async function submitDelAvocat(values, context, avocat) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELAVO", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    const result = await deleteAvocat(avocat.id);

    if (result.error) {
        renderMessage(context.screen, "DELAVO", result.error);
        return;
    }

    context.resetPage("avocats");
    await handleAvocats(context);
}

async function handleClients(context) {
    context.setView("clients");

    context.screen.innerHTML = `
        <section>
            <h2>CLIENTS</h2>
            <p>CHARGEMENT DES CLIENTS...</p>
        </section>
    `;

    const result = await getClients(context.getPage("clients"));

    if (result.error) {
        renderMessage(context.screen, "CLIENTS", result.error);
        return;
    }

    renderClientsScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleClientsNext(context) {
    const nextPage = context.getPage("clients") + 1;
    context.setPage("clients", nextPage);
    await handleClients(context);
}

async function handleClientsPrev(context) {
    const prevPage = Math.max(1, context.getPage("clients") - 1);
    context.setPage("clients", prevPage);
    await handleClients(context);
}

async function handleClient(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "CLI", "SYNTAXE : CLI [REFERENCE_CLIENT]");
        return;
    }

    const result = await getClientByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "CLI", result.error);
        return;
    }

    setContextClient(context, result.data);

    renderClientScreen(
        context.screen,
        result.data,
        result.dossiersCount
    );
}


async function handleClientDossiers(args, context) {
    const reference = args[0] || context.currentClient?.reference_client;

    if (!reference) {
        renderMessage(context.screen, "CLIDOS", "AUCUN CLIENT ACTIF. UTILISEZ CLI [REFERENCE_CLIENT] OU CLIDOS [REFERENCE_CLIENT].");
        return;
    }

    const client = await getClientByReference(reference);

    if (client.error) {
        renderMessage(context.screen, "CLIDOS", client.error);
        return;
    }

    setContextClient(context, client.data);
    context.setView("clientDossiers");

    context.screen.innerHTML = `
        <section>
            <h2>CLIDOS</h2>
            <p>CHARGEMENT DES DOSSIERS CLIENT...</p>
        </section>
    `;

    const result = await getDossiersByClient(
        client.data.reference_client,
        context.getPage("clientDossiers")
    );

    if (result.error) {
        renderMessage(context.screen, "CLIDOS", result.error);
        return;
    }

    renderClientDossiersScreen(
        context.screen,
        client.data,
        result.data,
        result.page,
        result.totalPages,
        result.count,
        result.totals
    );
}

async function handleClientDossiersNext(context) {
    const nextPage = context.getPage("clientDossiers") + 1;

    context.setPage("clientDossiers", nextPage);

    await handleClientDossiers([], context);
}

async function handleClientDossiersPrev(context) {
    const prevPage = Math.max(1, context.getPage("clientDossiers") - 1);

    context.setPage("clientDossiers", prevPage);

    await handleClientDossiers([], context);
}

async function handleAddClient(args, context) {
    const tarifs = await getTarifOptions();

    if (tarifs.error) {
        renderMessage(context.screen, "ADDCLI", tarifs.error);
        return;
    }

    const siret = String(args?.[0] || "").replace(/\D/g, "");
    let prefill = null;

    if (args?.[0]) {
        if (!/^\d{14}$/.test(siret)) {
            renderMessage(context.screen, "ADDCLI", "SIRET INVALIDE. UTILISEZ ADDCLI [SIRET 14 CHIFFRES] OU ADDCLI POUR UNE SAISIE MANUELLE.");
            return;
        }

        context.screen.innerHTML = `<pre class="terminal-table">============================== ADDCLI ==============================\n\nRECHERCHE DU SIRET ${siret}...\n\n====================================================================</pre>`;
        const recherche = await rechercherEntrepriseParSiret(siret);
        if (recherche.error) {
            renderMessage(context.screen, "ADDCLI", `${recherche.error}\n\nPOUR UNE SAISIE MANUELLE : ADDCLI`);
            return;
        }
        prefill = recherche.data;
    }

    openClientForm(
        context,
        "ADDCLI",
        prefill,
        async (values, submitContext) => { await submitAddClient(values, submitContext); },
        (cancelContext) => { renderMessage(cancelContext.screen, "ADDCLI", "CREATION CLIENT ANNULEE."); },
        { tarifOptions: tarifs.options }
    );
}

async function rechercherEntrepriseParSiret(siret) {
    try {
        const response = await fetch(`/.netlify/functions/recherche-entreprise-siret?siret=${encodeURIComponent(siret)}`, {
            headers: { Accept: "application/json" }
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload?.entreprise) return { data: null, error: payload?.error || "RECHERCHE SIRET IMPOSSIBLE." };
        return { data: payload.entreprise, error: null };
    } catch (error) {
        console.error("ERREUR ADDCLI SIRET :", error);
        return { data: null, error: "SERVICE DE RECHERCHE SIRET INDISPONIBLE." };
    }
}

async function submitAddClient(values, context) {
    const result = await createClient(values);

    if (result.error) {
        renderMessage(context.screen, "ADDCLI", result.error);
        return;
    }

    const client = await getClientByReference(result.data.reference_client);

    renderClientScreen(
        context.screen,
        result.data,
        client.dossiersCount || 0
    );
}

async function handleModClient(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "MODCLI", "SYNTAXE : MODCLI [REFERENCE_CLIENT]");
        return;
    }

    const result = await getClientByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "MODCLI", result.error);
        return;
    }

    const tarifs = await getTarifOptions();

    if (tarifs.error) {
        renderMessage(context.screen, "MODCLI", tarifs.error);
        return;
    }

    const tarifDefautCode = await getTarifCodeById(result.data.tarif_defaut_id);

    openClientForm(
        context,
        "MODCLI",
        result.data,
        async (values, submitContext) => {
            await submitModClient(values, submitContext, result.data.id);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODCLI", "MODIFICATION CLIENT ANNULEE.");
        },
        {
            tarifOptions: tarifs.options,
            tarifDefautCode
        }
    );
}

async function submitModClient(values, context, clientId) {
    const result = await updateClient(clientId, values);

    if (result.error) {
        renderMessage(context.screen, "MODCLI", result.error);
        return;
    }

    const client = await getClientByReference(result.data.reference_client);

    renderClientScreen(
        context.screen,
        result.data,
        client.dossiersCount || 0
    );
}

async function handleDelClient(args, context) {
    const reference = args[0];

    if (!reference) {
        renderMessage(context.screen, "DELCLI", "SYNTAXE : DELCLI [REFERENCE_CLIENT]");
        return;
    }

    const result = await getClientByReference(reference);

    if (result.error) {
        renderMessage(context.screen, "DELCLI", result.error);
        return;
    }

    openDelClientForm(
        context,
        result.data,
        result.dossiersCount,
        async (values, submitContext) => {
            await submitDelClient(values, submitContext, result.data, result.dossiersCount);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELCLI", "SUPPRESSION CLIENT ANNULEE.");
        }
    );
}

async function submitDelClient(values, context, client, dossiersCount) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELCLI", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    if (Number(dossiersCount || 0) > 0) {
        renderMessage(context.screen, "DELCLI", "SUPPRESSION IMPOSSIBLE : CLIENT RATTACHE A DES DOSSIERS.");
        return;
    }

    const result = await deleteClient(client.id, client.reference_client);

    if (result.error) {
        renderMessage(context.screen, "DELCLI", result.error);
        return;
    }

    context.resetPage("clients");
    await handleClients(context);
}

async function handleDelDossier(args, context) {
    const role = String(context.profile?.role || "").trim().toUpperCase();
    if (role !== "ADMIN") {
        renderMessage(context.screen, "DELDOS", "ACCES REFUSE. COMMANDE RESERVEE ADMIN.");
        return;
    }

    const reference = String(args[0] || context.currentDossier?.reference_dossier || "").trim();
    if (!reference) {
        renderMessage(context.screen, "DELDOS", "SYNTAXE : DELDOS [N° DOSSIER]");
        return;
    }

    const result = await getDossierByReference(reference);
    if (result.error || !result.data) {
        renderMessage(context.screen, "DELDOS", result.error || "DOSSIER INTROUVABLE.");
        return;
    }

    openDelDossierForm(
        context,
        result.data,
        async (values, submitContext) => {
            const attendu = String(result.data.reference_dossier || "").trim().toUpperCase();
            const saisi = String(values.reference_confirmation || "").trim().toUpperCase();
            const motif = String(values.motif || "").trim();

            if (saisi !== attendu) {
                renderMessage(submitContext.screen, "DELDOS", "SUPPRESSION NON CONFIRMEE : NUMERO DE DOSSIER INCORRECT.");
                return;
            }
            if (!motif) {
                renderMessage(submitContext.screen, "DELDOS", "MOTIF DE SUPPRESSION OBLIGATOIRE.");
                return;
            }

            const suppression = await supprimerDossierTest(attendu, motif);
            if (suppression.error) {
                renderMessage(submitContext.screen, "DELDOS", suppression.error);
                return;
            }

            if (String(submitContext.currentDossier?.reference_dossier || "").toUpperCase() === attendu) {
                submitContext.setCurrentDossier(null);
            }
            submitContext.resetPage("liste");
            submitContext.resetPage("taches");
            renderMessage(submitContext.screen, "DELDOS", `DOSSIER ${attendu} SUPPRIME. TRACE CONSERVEE DANS LE JOURNAL D'AUDIT.`);
        },
        (cancelContext) => renderMessage(cancelContext.screen, "DELDOS", "SUPPRESSION DOSSIER ANNULEE.")
    );
}

async function handleNext(context) {
    context.screen.innerHTML = `<section><h2>NEXT</h2><p>RECHERCHE D'UN DOSSIER A TRAITER...</p></section>`;

    const { data, error } = await getNextDossier({
        excludeReference: context.currentDossier?.reference_dossier || null
    });

    if (error) {
        renderMessage(context.screen, "NEXT", error);
        return;
    }

    setContextDossier(context, data);

const stats = await getDossierStats(data.id);

const paiements = await getPaiementsByDossier(data.id);

const situation = calculerSituationFinanciere(
    data,
    paiements.data || []
);

await renderDossierScreen(
    context.screen,
    data,
    stats,
    situation
);
}

async function handleTaches(context) {
    context.setView("taches");

    context.screen.innerHTML = `
        <section>
            <h2>TACHES</h2>
            <p>CHARGEMENT DES TACHES...</p>
        </section>
    `;

    const rappels = await getTachesDuJour(context.getPage("taches"));
    const promesses = await getPromessesAControler();
    const echeancesImpayees = await getEcheancesImpayees();
    const tachesMetier = await getTachesMetier(context.getPage("taches"));

    if (rappels.error) {
        renderMessage(context.screen, "TACHES", rappels.error);
        return;
    }

    if (promesses.error) {
        renderMessage(context.screen, "TACHES", promesses.error);
        return;
    }

    if (echeancesImpayees.error) {
        renderMessage(context.screen, "TACHES", echeancesImpayees.error);
        return;
    }

    if (tachesMetier.error) {
        renderMessage(context.screen, "TACHES", tachesMetier.error);
        return;
    }

    renderTachesScreen(
        context.screen,
        rappels.data,
        promesses.data,
        context.profile,
        Math.max(rappels.page, tachesMetier.page),
        Math.max(rappels.totalPages, tachesMetier.totalPages),
        rappels.count,
        echeancesImpayees.data,
        tachesMetier.data,
        tachesMetier.count
    );
}

async function handleTachesFutures(context) {
    context.setView("taches_futures");

    context.screen.innerHTML = `
        <section>
            <h2>TACHESFUT</h2>
            <p>CHARGEMENT DES TACHES FUTURES...</p>
        </section>
    `;

    const result = await getTachesMetierFutures(context.getPage("taches_futures"));

    if (result.error) {
        renderMessage(context.screen, "TACHESFUT", result.error);
        return;
    }

    renderTachesScreen(
        context.screen,
        [],
        [],
        context.profile,
        result.page,
        result.totalPages,
        0,
        [],
        result.data,
        result.count,
        {
            title: "TACHES FUTURES",
            onlyMetier: true,
            emptyMetierMessage: "AUCUNE TACHE FUTURE.",
            prevCommand: "TFPREV",
            nextCommand: "TFNEXT"
        }
    );
}

async function handleTachesRetard(context) {
    context.setView("taches_retard");

    context.screen.innerHTML = `
        <section>
            <h2>TACHESRETARD</h2>
            <p>CHARGEMENT DES TACHES EN RETARD...</p>
        </section>
    `;

    const result = await getTachesMetierRetard(context.getPage("taches_retard"));

    if (result.error) {
        renderMessage(context.screen, "TACHESRETARD", result.error);
        return;
    }

    renderTachesScreen(
        context.screen,
        [],
        [],
        context.profile,
        result.page,
        result.totalPages,
        0,
        [],
        result.data,
        result.count,
        {
            title: "TACHES EN RETARD",
            onlyMetier: true,
            emptyMetierMessage: "AUCUNE TACHE EN RETARD.",
            prevCommand: "TRPREV",
            nextCommand: "TRNEXT"
        }
    );
}

async function handleHis(context) {
    context.setView("historique");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "HIS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT.");
        return;
    }

    const result = await getHistoriqueByDossier(
        dossier,
        context.getPage("historique")
    );

    if (result.error) {
        renderMessage(context.screen, "HIS", result.error);
        return;
    }

    renderHistoriqueScreen(
        context.screen,
        dossier,
        result.data,
        result.page,
        result.totalPages,
        result.count,
        {
            isGroup: result.isGroup,
            groupDossiers: result.groupDossiers
        }
    );
}

async function handleHisNext(context) {
    const nextPage = context.getPage("historique") + 1;

    context.setPage("historique", nextPage);

    await handleHis(context);
}

async function handleHisPrev(context) {
    const prevPage = Math.max(1, context.getPage("historique") - 1);

    context.setPage("historique", prevPage);

    await handleHis(context);
}


async function handleDelHis(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "DELHIS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const role = String(context.profile?.role || "").trim().toUpperCase();

    if (role !== "ADMIN") {
        renderMessage(context.screen, "DELHIS", "ACCES REFUSE. COMMANDE RESERVEE ADMIN.");
        return;
    }

    const result = await getHistoriqueByDossier(dossier.id, 1, 200);

    if (result.error) {
        renderMessage(context.screen, "DELHIS", result.error);
        return;
    }

    if (!result.data.length) {
        renderMessage(context.screen, "DELHIS", "AUCUNE LIGNE D'HISTORIQUE A SUPPRIMER.");
        return;
    }

    openDelHistoriqueForm(
        context,
        dossier,
        result.data,
        async (values, submitContext) => {
            await submitDelHis(values, submitContext, dossier, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELHIS", "SUPPRESSION HISTORIQUE ANNULEE.");
        }
    );
}

async function submitDelHis(values, context, dossier, lignes) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELHIS", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    const numero = Number(values.numero_ligne || 0);
    const ligne = lignes[numero - 1];

    if (!ligne) {
        renderMessage(context.screen, "DELHIS", "NUMERO LIGNE HISTORIQUE INVALIDE.");
        return;
    }

    const suppression = await deleteHistorique(ligne.id);

    if (suppression.error) {
        renderMessage(context.screen, "DELHIS", suppression.error);
        return;
    }

    context.resetPage("historique");
    await handleHis(context);
}


const STATUTS_DOSSIER = ["NOUVEAU", "AMIABLE", "PROMESSE", "ECHEANCIER", "CONTESTATION", "CONTENTIEUX", "JUDICIAIRE", "SUSPENDU", "SOLDE", "CLOTURE"];

async function changerStatutAvecHistorique(context, dossier, nouveauStatut, libelle = "CHANGEMENT DE STATUT") {
    const ancienStatut = String(dossier?.statut_code || "").trim().toUpperCase();
    const cible = String(nouveauStatut || "").trim().toUpperCase();
    if (!dossier?.id || !cible || ancienStatut === cible) return { data: dossier, error: null, changed: false };
    if (!STATUTS_DOSSIER.includes(cible)) return { data: null, error: `STATUT INCONNU : ${cible}`, changed: false };

    const result = await updateStatutDossier({ dossierId: dossier.id, statutCode: cible });
    if (result.error) return { data: null, error: result.error, changed: false };

    const hist = await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "STATUT",
        libelle,
        detail: `ANCIEN STATUT : ${ancienStatut || "-"} / NOUVEAU : ${cible}`,
        utilisateurId: context.user?.id
    });
    if (result.data) setContextDossier(context, result.data);
    return { data: result.data || dossier, error: hist.error || null, changed: true };
}

async function basculerNouveauVersAmiable(context, dossier) {
    if (String(dossier?.statut_code || "").toUpperCase() !== "NOUVEAU") return dossier;
    const result = await changerStatutAvecHistorique(context, dossier, "AMIABLE", "CHANGEMENT AUTOMATIQUE");
    return result.data || dossier;
}

async function basculerGroupeNouveauVersAmiable(context, dossiers = [], referenceActive = "") {
    for (const item of dossiers || []) {
        if (String(item?.statut_code || "").toUpperCase() !== "NOUVEAU") continue;

        const result = await updateStatutDossier({
            dossierId: item.id,
            statutCode: "AMIABLE"
        });

        if (result.error) {
            console.error("ERREUR STATUT GROUPE :", item.reference_dossier, result.error);
            continue;
        }

        await addHistorique({
            dossierId: item.id,
            typeEvenement: "STATUT",
            libelle: "CHANGEMENT AUTOMATIQUE",
            detail: "ANCIEN STATUT : NOUVEAU / NOUVEAU : AMIABLE - ACTION GROUPE",
            utilisateurId: context.user?.id
        });
    }

    if (referenceActive) {
        const refreshed = await getDossierByReference(referenceActive);
        if (refreshed.data) setContextDossier(context, refreshed.data);
    }
}

function dateProchainJourOuvreFrance(base = new Date()) {
    const d = new Date(base);
    do { d.setDate(d.getDate() + 1); } while (!estJourOuvreFranceLocal(d));
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function estJourOuvreFranceLocal(date) {
    if ([0,6].includes(date.getDay())) return false;
    return !joursFeriesFranceLocal(date.getFullYear()).has(dateKeyLocal(date));
}
function joursFeriesFranceLocal(year) {
    const fixed=[[1,1],[5,1],[5,8],[7,14],[8,15],[11,1],[11,11],[12,25]];
    const keys=new Set(fixed.map(([m,d])=>`${year}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`));
    const easter=dimanchePaquesLocal(year);
    [1,39,50].forEach(offset=>{ const d=new Date(easter); d.setDate(d.getDate()+offset); keys.add(dateKeyLocal(d)); });
    return keys;
}
function dimanchePaquesLocal(year) {
    const a=year%19,b=Math.floor(year/100),c=year%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3);
    const h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451);
    const month=Math.floor((h+l-7*m+114)/31),day=((h+l-7*m+114)%31)+1;
    return new Date(year,month-1,day,12,0,0,0);
}
function dateKeyLocal(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }

async function programmerRappelAppelInfructueux(context, dossier) {
    const cible = dateProchainJourOuvreFrance();
    const aujourdHui = dateKeyLocal(new Date());
    const existante = String(dossier?.date_rappel || "").slice(0,10);

    // Un rappel deja arrive a echeance (aujourd'hui ou dans le passe) ne doit
    // surtout pas etre conserve apres une nouvelle tentative infructueuse :
    // l'appel vient d'etre effectue et la prochaine tentative est J+1 ouvre.
    // On ne conserve qu'un eventuel rappel FUTUR deja programme plus tot ou
    // le meme jour que la cible calculee.
    const conserverRappelFuturPlusProche = Boolean(
        existante && existante > aujourdHui && existante <= cible
    );
    const dateRappel = conserverRappelFuturPlusProche ? existante : cible;
    const motifRappel = conserverRappelFuturPlusProche && dossier?.motif_rappel
        ? dossier.motif_rappel
        : "DÉBITEUR A RAPPELER";

    const result = await updateRappelDossier({ dossierId: dossier.id, dateRappel, motifRappel });
    if (result.data) setContextDossier(context, result.data);
    return result;
}

async function handleStatut(args, context) {
    const dossier = context.currentDossier;
    if (!dossier) { renderMessage(context.screen, "STATUT", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT."); return; }
    const cible = String(args[0] || "").trim().toUpperCase();
    if (!cible) {
        renderMessage(context.screen, "STATUT", `STATUT ACTUEL : ${dossier.statut_code || "-"}\n\nSTATUTS : ${STATUTS_DOSSIER.join(" / ")}\n\nSYNTAXE : STATUT [NOUVEAU_STATUT]`);
        return;
    }
    const result = await changerStatutAvecHistorique(context, dossier, cible);
    if (result.error) { renderMessage(context.screen, "STATUT", result.error); return; }
    if (!result.changed) { renderMessage(context.screen, "STATUT", `LE DOSSIER EST DEJA AU STATUT ${cible}.`); return; }
    renderMessage(context.screen, "STATUT MODIFIE", `${String(dossier.statut_code || "-").toUpperCase()} -> ${cible}`);
}

async function handleCalla(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(
            context.screen,
            "CALLA",
            "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT."
        );
        return;
    }

    const debiteur = dossier.debiteurs || {};
    const telephone = debiteur.telephone_mobile || debiteur.telephone_fixe || "";

    if (!telephone) {
        renderMessage(
            context.screen,
            "CALLA",
            "AUCUN NUMERO DE TELEPHONE RENSEIGNE SUR LE DOSSIER."
        );
        return;
    }

    const lancer = async (portee = "DOSSIER", groupContext = null) => {
        const dossierAffiche = portee === "GROUPE"
            ? { ...dossier, reference_dossier: groupContext.referenceCourte }
            : dossier;

        openCallaForm(
            context,
            dossierAffiche,
            telephone,
            async (values, submitContext) => {
                await submitCalla(values, submitContext, dossier, portee, groupContext);
            },
            (cancelContext) => {
                renderMessage(cancelContext.screen, "CALLA", "APPEL AUTOMATIQUE ANNULE.");
            }
        );
    };

    if (!dossier.groupe_dossier_id) {
        await lancer();
        return;
    }

    const group = await buildGroupActionContext(dossier);
    if (group.error) {
        renderMessage(context.screen, "CALLA", group.error);
        return;
    }

    openGroupScopeForm(
        context,
        dossier,
        group.data,
        "CALLA",
        async (values, submitContext) => {
            const portee = String(values.portee || "1").trim() === "2" ? "GROUPE" : "DOSSIER";
            if (portee === "GROUPE" && group.data.multiCreancier) {
                renderMessage(
                    submitContext.screen,
                    "CALLA",
                    "RELANCE GROUPE NON DISPONIBLE : LES DOSSIERS DU GROUPE APPARTIENNENT A PLUSIEURS CREANCIERS."
                );
                return;
            }
            await lancer(portee, group.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "CALLA", "APPEL AUTOMATIQUE ANNULE.");
        }
    );
}

async function submitCalla(values, context, dossier, portee = "DOSSIER", groupContext = null) {
    const modele = String(values.modele || "").trim();
    const telephone = String(values.telephone || "").trim();

    if (!["1", "2", "3", "4", "5", "6"].includes(modele)) {
        renderMessage(
            context.screen,
            "CALLA",
            "MODELE INVALIDE. CHOISISSEZ UN MODELE DE 1 A 6."
        );
        return;
    }

    if (!telephone) {
        renderMessage(context.screen, "CALLA", "TELEPHONE OBLIGATOIRE.");
        return;
    }

    renderMessage(
        context.screen,
        "CALLA",
        `LANCEMENT MAILINGVOX - MESSAGE ${modele}${portee === "GROUPE" ? " - GROUPE" : ""}...`
    );

    const dossierEnvoi = portee === "GROUPE"
        ? { ...dossier, reference_dossier: groupContext.referenceCourte }
        : dossier;

    const result = await lancerAppelAutomatiqueMailingVox({
        dossier: dossierEnvoi,
        telephone,
        modele
    });

    if (result.error) {
        renderMessage(context.screen, "CALLA", result.error);
        return;
    }

    const campagneId = result.data?.campaignId || "-";

    if (portee === "GROUPE") {
        const refs = groupContext.references.join(" / ");
        await basculerGroupeNouveauVersAmiable(context, groupContext.dossiers, dossier.reference_dossier);
        const hist = await addHistoriqueGroupe({
            dossierActifId: dossier.id,
            dossierIds: groupContext.dossierIds,
            typeEvenement: "CALLA",
            libelle: `APPEL AUTOMATIQUE GROUPE MAILINGVOX - MESSAGE ${modele}`,
            detail: `ACTION GROUPE - DOSSIERS ${refs} - DESTINATAIRE ${telephone} - CAMPAGNE ${campagneId}`,
            utilisateurId: context.user?.id
        });
        if (hist.error) {
            renderMessage(context.screen, "CALLA", hist.error);
            return;
        }

        renderMessage(
            context.screen,
            "CALLA GROUPE LANCE",
            `MESSAGE ${modele} - ${telephone} - ${groupContext.references.length} DOSSIERS - CAMPAGNE MAILINGVOX ${campagneId}`
        );
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "CALLA",
        libelle: `APPEL AUTOMATIQUE MAILINGVOX - MESSAGE ${modele}`,
        detail: `DESTINATAIRE ${telephone} - CAMPAGNE ${campagneId}`,
        utilisateurId: context.user?.id
    });

    await basculerNouveauVersAmiable(context, dossier);

    renderMessage(
        context.screen,
        "CALLA LANCE",
        `MESSAGE ${modele} - ${telephone} - CAMPAGNE MAILINGVOX ${campagneId}`
    );
}

async function handleCallaGroup(context) {
    openCallaGroupForm(
        context,
        async (values, submitContext) => {
            const modele = String(values.modele || "").trim();
            const statut = String(values.statut || "").trim().toUpperCase();
            const dateLimite = String(values.date_limite || "").trim();
            const limite = String(values.limite || "50").trim();

            renderMessage(
                submitContext.screen,
                "CALLAG",
                "PREPARATION DE LA SELECTION..."
            );

            const result = await preparerCallaGroup({
                modele,
                statut,
                dateLimite,
                limite
            });

            if (result.error) {
                renderMessage(submitContext.screen, "CALLAG", result.error);
                return;
            }

            renderCallaGroupPreview(submitContext, result.data);
        },
        (cancelContext) => {
            clearPendingCallaGroup();
            renderMessage(
                cancelContext.screen,
                "CALLAG",
                "SELECTION D'ENVOI GROUPE ANNULEE."
            );
        }
    );
}

function renderCallaGroupPreview(context, selection) {
    const dossiers = selection?.dossiers || [];
    const sansTelephone = selection?.sansTelephone || [];
    const apercu = dossiers.slice(0, 20).map((dossier) => {
        const ref = String(dossier.reference_dossier || "-").padEnd(14).slice(0, 14);
        const nom = String(dossier.nomDebiteur || "-").toUpperCase().padEnd(28).slice(0, 28);
        const date = formatCallaGroupDate(dossier.date_derniere_action || dossier.created_at);
        const tel = String(dossier.telephone || "-").padEnd(16).slice(0, 16);
        return `${ref} ${nom} ${date.padEnd(10)} ${tel}`;
    });

    const suite = dossiers.length > 20
        ? `\n... ${dossiers.length - 20} AUTRE(S) DOSSIER(S)`
        : "";

    context.screen.innerHTML = `
        <section>
            <h2>CALLAG - PREVISUALISATION</h2>
            <pre class="terminal-table">MODELE              : ${selection.modele}
STATUT              : ${selection.statut}
DERNIERE ACTION <=  : ${selection.dateLimite}
DOSSIERS A ENVOYER : ${dossiers.length}
SANS TELEPHONE     : ${sansTelephone.length}

REFERENCE      DEBITEUR                     DERNIERE   TELEPHONE
${apercu.length ? apercu.join("\n") : "AUCUN DOSSIER ELIGIBLE."}${suite}

AUCUN MESSAGE N'A ENCORE ETE ENVOYE.
${dossiers.length ? "TAPEZ CALLAGVAL POUR LANCER L'ENVOI.\nTAPEZ CALLAGANNUL POUR ANNULER." : "MODIFIEZ VOS CRITERES AVEC CALLAG."}</pre>
        </section>
    `;
}

async function handleCallaGroupVal(context) {
    const pending = getPendingCallaGroup();
    if (!pending) {
        renderMessage(
            context.screen,
            "CALLAGVAL",
            "AUCUNE SELECTION CALLAG EN ATTENTE. UTILISEZ D'ABORD CALLAG."
        );
        return;
    }

    if (!pending.dossiers?.length) {
        clearPendingCallaGroup();
        renderMessage(context.screen, "CALLAGVAL", "AUCUN DOSSIER ELIGIBLE A ENVOYER.");
        return;
    }

    const total = pending.dossiers.length;
    renderMessage(context.screen, "CALLAG", `ENVOI EN COURS : 0/${total}...`);

    const result = await executerCallaGroup({
        utilisateurId: context.user?.id,
        onProgress: (index, count, dossier) => {
            renderMessage(
                context.screen,
                "CALLAG - ENVOI EN COURS",
                `${index}/${count} - DOSSIER ${dossier.reference_dossier || "-"}`
            );
        }
    });

    if (result.error) {
        renderMessage(context.screen, "CALLAG", result.error);
        return;
    }

    const succes = result.data?.succes || [];
    const echecs = result.data?.echecs || [];
    const histErreurs = succes.filter((item) => item.historiqueErreur).length;
    const erreursTxt = echecs.slice(0, 10).map((item) =>
        `${item.dossier.reference_dossier || "-"} : ${item.error}`
    );

    renderMessage(
        context.screen,
        "CALLAG TERMINE",
        `MODELE ${result.data.selection.modele} - STATUT ${result.data.selection.statut}\n\n` +
        `ENVOYES : ${succes.length}\n` +
        `ECHECS   : ${echecs.length}\n` +
        `HIS AVEC ALERTE : ${histErreurs}\n` +
        (erreursTxt.length ? `\nPREMIERS ECHECS :\n${erreursTxt.join("\n")}` : "")
    );
}

function handleCallaGroupAnnul(context) {
    const pending = getPendingCallaGroup();
    clearPendingCallaGroup();
    renderMessage(
        context.screen,
        "CALLAG",
        pending ? "SELECTION CALLAG ANNULEE. AUCUN MESSAGE ENVOYE." : "AUCUNE SELECTION CALLAG EN ATTENTE."
    );
}

function formatCallaGroupDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
    return [
        String(date.getDate()).padStart(2, "0"),
        String(date.getMonth() + 1).padStart(2, "0"),
        date.getFullYear()
    ].join("/");
}

async function handleCall(args, context) {
    let dossier = context.currentDossier;
    if (!dossier) { renderMessage(context.screen, "CALL", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT."); return; }
    const code = (args[0] || "").toUpperCase();
    if (!code) { renderCallHelp(context.screen, dossier); return; }
    const resultats = { J:"DEBITEUR JOINT", R:"REPONDEUR", I:"INJOIGNABLE", N:"NUMERO INVALIDE", P:"PROMESSE DE PAIEMENT", C:"CONTESTATION", REFUS:"REFUS DE PAYER" };
    const libelle = resultats[code];
    if (!libelle) { renderMessage(context.screen, "CALL", "CODE APPEL INCONNU. UTILISEZ CALL POUR AFFICHER LES CODES."); return; }
    const detail = args.slice(1).join(" ");
    const { error } = await addHistorique({ dossierId:dossier.id, typeEvenement:"CALL", libelle, detail, utilisateurId:context.user?.id });
    if (error) { renderMessage(context.screen, "CALL", error); return; }

    dossier = await basculerNouveauVersAmiable(context, dossier);
    let complement = "";
    if (code === "R" || code === "I") {
        const rappel = await programmerRappelAppelInfructueux(context, dossier);
        if (rappel.error) { renderMessage(context.screen, "CALL", `APPEL ENREGISTRE MAIS RAPPEL NON CREE : ${rappel.error}`); return; }
        const courant = rappel.data || context.currentDossier || dossier;
        complement = ` - RAPPEL ${String(courant.date_rappel || "").slice(0,10)} ${courant.motif_rappel || "DÉBITEUR A RAPPELER"}`;
    }
    renderMessage(context.screen, "CALL ENREGISTRE", `${libelle}${detail ? " - " + detail : ""}${complement}`);
}
async function handleNote(args, context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "NOTE", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT.");
        return;
    }

    const detail = args.join(" ");

    if (!detail) {
        renderMessage(context.screen, "NOTE", "SYNTAXE : NOTE [TEXTE]");
        return;
    }

    const { error } = await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "NOTE",
        libelle: "NOTE DOSSIER",
        detail,
        utilisateurId: context.user?.id
    });

    if (error) {
        renderMessage(context.screen, "NOTE", error);
        return;
    }

    renderMessage(context.screen, "NOTE ENREGISTREE", detail);
}

async function handleRappelForm(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(
            context.screen,
            "RAPPEL",
            "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT."
        );
        return;
    }

    renderRappelForm(
        context.screen,
        dossier
    );
}

async function handleRappel(args, context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "RAPPEL", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT.");
        return;
    }

    const date = parseDateInput(args[0]);

    if (!date) {
        renderMessage(context.screen, "RAPPEL", "SYNTAXE : RAPPEL JJ/MM/AAAA [MOTIF]");
        return;
    }

    const motif = args.slice(1).join(" ") || "RAPPEL OPERATEUR";

    const { data, error } = await updateRappelDossier({
        dossierId: dossier.id,
        dateRappel: date,
        motifRappel: motif
    });

    if (error) {
        renderMessage(context.screen, "RAPPEL", error);
        return;
    }

    if (data) {
        setContextDossier(context, data);
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "RAPPEL",
        libelle: `RAPPEL PREVU LE ${formatDate(date)}`,
        detail: motif,
        utilisateurId: context.user?.id
    });

    renderMessage(context.screen, "RAPPEL ENREGISTRE", `DATE : ${formatDate(date)} - ${motif}`);
}

async function handlePromForm(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(
            context.screen,
            "PROM",
            "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT."
        );
        return;
    }

    renderPromesseForm(
        context.screen,
        dossier
    );
}

async function handleProm(args, context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "PROM", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT.");
        return;
    }

    const montant = Number(String(args[0] || "").replace(",", "."));
    const datePromesse = parseDateInput(args[1]);
    const commentaire = args.slice(2).join(" ");

    if (!montant || !datePromesse) {
        renderMessage(context.screen, "PROM", "SYNTAXE : PROM [MONTANT] [JJ/MM/AAAA] [COMMENTAIRE]");
        return;
    }

    const { error } = await createPromesse({
        dossierId: dossier.id,
        montant,
        datePromesse,
        commentaire,
        userId: context.user?.id
    });

    if (error) {
        renderMessage(context.screen, "PROM", error);
        return;
    }

    const rappelUpdate = await updateRappelDossier({
        dossierId: dossier.id,
        dateRappel: datePromesse,
        motifRappel: "PROMESSE A CONTROLER",
        statutCode: "PROMESSE"
    });

if (rappelUpdate.data) {
    setContextDossier(context, rappelUpdate.data);
}

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "PROM",
        libelle: `PROMESSE DE PAIEMENT ${formatMoney(montant)} LE ${formatDate(datePromesse)}`,
        detail: commentaire,
        utilisateurId: context.user?.id
    });

    renderMessage(context.screen, "PROMESSE ENREGISTREE", `${formatMoney(montant)} POUR LE ${formatDate(datePromesse)}`);
}

async function handlePromStatut(context, statut) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "PROMESSE", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const { data: promesse, error } = await getPromesseActive(dossier.id);

    if (error) {
        renderMessage(context.screen, "PROMESSE", error);
        return;
    }

    if (!promesse) {
        renderMessage(context.screen, "PROMESSE", "AUCUNE PROMESSE ACTIVE SUR CE DOSSIER.");
        return;
    }

    const result = await updatePromesseStatut({
        promesseId: promesse.id,
        statut
    });

    if (result.error) {
        renderMessage(context.screen, "PROMESSE", result.error);
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "PROM",
        libelle: `PROMESSE ${statut}`,
        detail: `${formatMoney(promesse.montant)} AU ${formatDate(promesse.date_promesse)} ${promesse.commentaire || ""}`,
        utilisateurId: context.user?.id
    });

    renderMessage(
        context.screen,
        "PROMESSE MISE A JOUR",
        `STATUT : ${statut}`
    );
}

async function handlePromList(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "PROMLIST", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT.");
        return;
    }

    const { data, error } = await getPromessesByDossier(dossier.id);

    if (error) {
        renderMessage(context.screen, "PROMLIST", error);
        return;
    }

    const rows = data.map((p) => {
        return `${formatDate(p.date_promesse).padEnd(12)} ${formatMoney(p.montant).padEnd(14)} ${String(p.statut || "").padEnd(10)} ${p.commentaire || ""}`;
    });

    context.screen.innerHTML = `
        <section>
            <h2>PROMESSES ${dossier.reference_dossier}</h2>
            <pre class="terminal-table">${rows.length ? rows.join("\n") : "AUCUNE PROMESSE."}</pre>
        </section>
    `;
}

async function handlePayForm(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(
            context.screen,
            "PAY",
            "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT."
        );
        return;
    }

    renderPaiementForm(
        context.screen,
        dossier
    );
}

async function handlePay(args, context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "PAY", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT.");
        return;
    }

    const montant = Number(String(args[0] || "").replace(",", "."));
    const modePaiement = (args[1] || "").toUpperCase();
    const origineEncaissement = (args[2] || "").toUpperCase();
    const referencePaiement = args[3] || "";
    const commentaire = args.slice(4).join(" ");

    if (!montant || !modePaiement || !["RECOVIA", "MANDANT"].includes(origineEncaissement)) {
        renderMessage(context.screen, "PAY", "SYNTAXE : PAYVALID [MONTANT] [MODE] [RECOVIA|MANDANT] [REFERENCE] [COMMENTAIRE]");
        return;
    }

    const paiement = await createPaiement({
        dossierId: dossier.id,
        montant,
        modePaiement,
        referencePaiement,
        commentaire,
        userId: context.user?.id,
        origineEncaissement
    });

    if (paiement.error) {
        renderMessage(context.screen, "PAY", paiement.error);
        return;
    }

    const affectation = await affecterPaiementAuxEcheances({
        dossierId: dossier.id,
        paiementId: paiement.data.id,
        montant
    });

    if (affectation.error) {
        renderMessage(context.screen, "PAY", affectation.error);
        return;
    }

    await creerHonorairePaiement(
        dossier,
        paiement.data,
        montant,
        `PAYVALID ${modePaiement} ${origineEncaissement} ${referencePaiement}`.trim()
    );

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "PAY",
        libelle: origineEncaissement === "MANDANT"
            ? `PAIEMENT CHEZ MANDANT ${formatMoney(montant)}`
            : `PAIEMENT RECU RECOVIA ${formatMoney(montant)}`,
        detail: `${origineEncaissement} - ${modePaiement} ${referencePaiement} ${commentaire}`.trim(),
        utilisateurId: context.user?.id
    });

    if (affectation.montantAffecte > 0) {
        await addHistorique({
            dossierId: dossier.id,
            typeEvenement: "ECH",
            libelle: "PAIEMENT AFFECTE ECHEANCIER",
            detail: `${formatMoney(affectation.montantAffecte)} AFFECTE - RELIQUAT ${formatMoney(affectation.reliquat || 0)}`,
            utilisateurId: context.user?.id
        });
    }

    const syncSolde = await synchroniserStatutSoldeDossier(context, dossier);

    if (syncSolde.error) {
        renderMessage(context.screen, "PAY", syncSolde.error);
        return;
    }

    renderMessage(
        context.screen,
        "PAIEMENT ENREGISTRE",
        `${formatMoney(montant)} - ${modePaiement} - ENCAISSEMENT ${origineEncaissement}${origineEncaissement === "MANDANT" ? " - HONORAIRES A FACTURER" : ""}`
    );
}

async function handlePayList(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "PAYLIST", "AUCUN DOSSIER ACTIF. UTILISEZ DOS [REFERENCE] OU NEXT.");
        return;
    }

    const { data, error } = await getPaiementsByDossier(dossier.id);

    if (error) {
        renderMessage(context.screen, "PAYLIST", error);
        return;
    }

    const rows = data.map((p) => {
        return `${formatDate(p.date_paiement).padEnd(12)} ${formatMoney(p.montant).padEnd(14)} ${String(p.origine_encaissement || "RECOVIA").padEnd(9)} ${String(p.mode_paiement || "").padEnd(12)} ${String(p.reference_paiement || "").padEnd(14)} ${p.commentaire || ""}`;
    });

    context.screen.innerHTML = `
        <section>
            <h2>PAIEMENTS ${dossier.reference_dossier}</h2>
            <pre class="terminal-table">${rows.length ? rows.join("\n") : "AUCUN PAIEMENT."}</pre>
        </section>
    `;
}

async function handleRevList(context) {
    const result = await getReversementsAEffectuer();
    if (result.error) { renderMessage(context.screen, "REVLIST", result.error); return; }
    context.reversementsAEffectuer = result.data;
    renderReversementsScreen(context.screen, result.data);
}

async function handleRevCli(args, context) {
    const result = await getReversementsAEffectuer();
    if (result.error) { renderMessage(context.screen, "REVCLI", result.error); return; }
    const groups = grouperReversementsParClient(result.data);
    if (!args.length) {
        context.reversementsParClient = groups;
        renderReversementsClientsScreen(context.screen, groups);
        return;
    }
    const numero = Number(args[0] || 0);
    const reference = args.slice(1).join(" ").trim();
    if (!numero || !reference) {
        renderMessage(context.screen, "REVCLI", "SYNTAXE : REVCLI [N° REVCLI] [REFERENCE VIREMENT]");
        return;
    }
    const group = groups[numero - 1];
    if (!group) { renderMessage(context.screen, "REVCLI", "NUMERO CLIENT INVALIDE. RELANCEZ REVCLI."); return; }
    const validation = await validerReversementClient(group, reference, context.user?.id);
    if (validation.error) { renderMessage(context.screen, "REVCLI", validation.error); return; }
    for (const item of group.itemsDus) {
        await addHistorique({
            dossierId: item.dossier_id,
            typeAction: "REVERSEMENT",
            commentaire: `REVERSEMENT GROUPE CLIENT ${group.referenceClient} - ${formatMoney(item.netAReverser)} - REF ${reference}`,
            userId: context.user?.id
        });
    }
    renderMessage(context.screen, "REVERSEMENT CLIENT ENREGISTRE", `${group.referenceClient} - ${formatMoney(group.netDu)} - ${group.itemsDus.length} PAIEMENT(S) REVERSE(S) - REF ${reference}`);
}

async function handleRev(args, context) {
    const numero = Number(args[0] || 0);
    const reference = args.slice(1).join(" ").trim();
    if (!numero || !reference) {
        renderMessage(context.screen, "REV", "SYNTAXE : REV [N° REVLIST] [REFERENCE VIREMENT]");
        return;
    }
    const result = await getReversementsAEffectuer();
    if (result.error) { renderMessage(context.screen, "REV", result.error); return; }
    const item = result.data[numero - 1];
    if (!item) { renderMessage(context.screen, "REV", "NUMERO DE REVERSEMENT INVALIDE. RELANCEZ REVLIST."); return; }
    const validation = await validerReversement(item, reference, context.user?.id);
    if (validation.error) { renderMessage(context.screen, "REV", validation.error); return; }
    await addHistorique({
        dossierId: item.dossier_id,
        typeEvenement: "REV",
        libelle: `REVERSEMENT MANDANT ${formatMoney(item.netAReverser)}`,
        detail: `ENCAISSE ${formatMoney(item.montantEncaisse)} - HON HT ${formatMoney(item.honorairesHt)} - TVA ${formatMoney(item.tvaHonoraires)} - REF ${reference}`,
        utilisateurId: context.user?.id
    });
    renderMessage(context.screen, "REVERSEMENT ENREGISTRE", `${formatMoney(item.netAReverser)} - REF ${reference}`);
}

async function handleRevHis(context) {
    const result = await getReversementsHistorique();
    if (result.error) { renderMessage(context.screen, "REVHIS", result.error); return; }
    renderReversementsHistoriqueScreen(context.screen, result.data);
}

async function handleDelPay(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "DELPAY", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);

    if (paiements.error) {
        renderMessage(context.screen, "DELPAY", paiements.error);
        return;
    }

    if (!paiements.data.length) {
        renderMessage(context.screen, "DELPAY", "AUCUN PAIEMENT A SUPPRIMER.");
        return;
    }

    openDelPaiementForm(
        context,
        dossier,
        paiements.data,
        async (values, submitContext) => {
            await submitDelPay(values, submitContext, dossier, paiements.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELPAY", "SUPPRESSION PAIEMENT ANNULEE.");
        }
    );
}

async function submitDelPay(values, context, dossier, paiements) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELPAY", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    const numero = Number(values.numero_paiement || 0);
    const paiement = paiements[numero - 1];

    if (!paiement) {
        renderMessage(context.screen, "DELPAY", "NUMERO PAIEMENT INVALIDE.");
        return;
    }

    const suppressionHonoraires = await supprimerHonorairesParPaiement(paiement.id);

if (suppressionHonoraires.error) {
    renderMessage(context.screen, "DELPAY", suppressionHonoraires.error);
    return;
}
    
    const suppression = await deletePaiement(paiement.id);

    if (suppression.error) {
        renderMessage(context.screen, "DELPAY", suppression.error);
        return;
    }

    const recalcul = await recalculerAffectationsEcheancier(dossier.id);

    if (recalcul.error) {
        renderMessage(context.screen, "DELPAY", recalcul.error);
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "DELPAY",
        libelle: `PAIEMENT SUPPRIME ${formatMoney(paiement.montant)}`,
        detail: `${formatDate(paiement.date_paiement)} ${paiement.mode_paiement || ""} ${paiement.reference_paiement || ""} ${paiement.commentaire || ""}`.trim(),
        utilisateurId: context.user?.id
    });

    const syncSolde = await synchroniserStatutSoldeDossier(context, dossier);

    if (syncSolde.error) {
        renderMessage(context.screen, "DELPAY", syncSolde.error);
        return;
    }

    renderMessage(context.screen, "PAIEMENT SUPPRIME", `${formatMoney(paiement.montant)} - ECHEANCIER RECALCULE`);
}

async function handleModPay(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "MODPAY", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);

    if (paiements.error) {
        renderMessage(context.screen, "MODPAY", paiements.error);
        return;
    }

    if (!paiements.data.length) {
        renderMessage(context.screen, "MODPAY", "AUCUN PAIEMENT A MODIFIER.");
        return;
    }

    openModPaiementSelectionForm(
        context,
        dossier,
        paiements.data,
        async (values, submitContext) => {
            await submitModPaySelection(values, submitContext, dossier, paiements.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODPAY", "MODIFICATION PAIEMENT ANNULEE.");
        }
    );
}

async function submitModPaySelection(values, context, dossier, paiements) {
    const numero = Number(values.numero_paiement || 0);
    const paiement = paiements[numero - 1];

    if (!paiement) {
        renderMessage(context.screen, "MODPAY", "NUMERO PAIEMENT INVALIDE.");
        return;
    }

    openModPaiementForm(
        context,
        dossier,
        paiement,
        async (formValues, submitContext) => {
            await submitModPay(formValues, submitContext, dossier, paiement);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODPAY", "MODIFICATION PAIEMENT ANNULEE.");
        }
    );
}

async function submitModPay(values, context, dossier, paiementInitial) {
    const datePaiement = dateOrNull(values.date_paiement);
    const montant = numberOrNull(values.montant);
    const modePaiement = textOrCurrent(values.mode_paiement, paiementInitial.mode_paiement || "VIREMENT");
    const origineEncaissement = textOrCurrent(values.origine_encaissement, paiementInitial.origine_encaissement || "RECOVIA").toUpperCase();
    const referencePaiement = textOrNull(values.reference_paiement) || "";
    const commentaire = textOrNull(values.commentaire) || "";

    if (!datePaiement || !montant || montant <= 0 || !modePaiement) {
        renderMessage(context.screen, "MODPAY", "DONNEES PAIEMENT INCOMPLETES.");
        return;
    }

    const modification = await updatePaiement({
        paiementId: paiementInitial.id,
        datePaiement,
        montant,
        modePaiement,
        referencePaiement,
        commentaire,
        origineEncaissement
    });

    if (modification.error) {
        renderMessage(context.screen, "MODPAY", modification.error);
        return;
    }

    const recalcul = await recalculerAffectationsEcheancier(dossier.id);

    if (recalcul.error) {
        renderMessage(context.screen, "MODPAY", recalcul.error);
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "MODPAY",
        libelle: `PAIEMENT MODIFIE ${formatMoney(montant)}`,
        detail: `ANCIEN ${formatMoney(paiementInitial.montant)} - ${modePaiement} ${referencePaiement} ${commentaire}`.trim(),
        utilisateurId: context.user?.id
    });

    const syncSolde = await synchroniserStatutSoldeDossier(context, dossier);

    if (syncSolde.error) {
        renderMessage(context.screen, "MODPAY", syncSolde.error);
        return;
    }

    renderMessage(context.screen, "PAIEMENT MODIFIE", `${formatMoney(montant)} - ECHEANCIER RECALCULE`);
}


async function handleFactures(context) {
    context.setView("factures");

    const result = await getClientsAFacturer(context.getPage("factures"));

    if (result.error) {
        renderMessage(context.screen, "FACTURES", result.error);
        return;
    }

    renderFacturesScreen(
        context.screen,
        result.data,
        result.page,
        result.totalPages,
        result.count,
        result.totals
    );
}

async function handleFacturesNext(context) {
    const nextPage = context.getPage("factures") + 1;
    context.setPage("factures", nextPage);
    await handleFactures(context);
}

async function handleFacturesPrev(context) {
    const prevPage = Math.max(1, context.getPage("factures") - 1);
    context.setPage("factures", prevPage);
    await handleFactures(context);
}

async function handleFactCli(args, context) {
    context.setView("factCli");

    const reference = args[0] || context.currentClient?.reference_client;

    if (!reference) {
        renderMessage(context.screen, "FACTCLI", "SYNTAXE : FACTCLI [REFERENCE CLIENT]");
        return;
    }

    const result = await getFacturationClient(reference);

    if (result.error) {
        renderMessage(context.screen, "FACTCLI", result.error);
        return;
    }

    if (typeof context.setCurrentClient === "function") {
        context.setCurrentClient(result.data.client);
    }

    renderFactCliScreen(
        context.screen,
        result.data,
        context.getPage("factCli")
    );
}

async function handleFactCliNext(context) {
    const nextPage = context.getPage("factCli") + 1;
    context.setPage("factCli", nextPage);
    await handleFactCli([], context);
}

async function handleFactCliPrev(context) {
    const prevPage = Math.max(1, context.getPage("factCli") - 1);
    context.setPage("factCli", prevPage);
    await handleFactCli([], context);
}

async function handleFactVal(context) {
    const client = context.currentClient;

    if (!client?.id) {
        renderMessage(context.screen, "FACTVAL", "AUCUN CLIENT ACTIF. UTILISEZ FACTCLI [REFERENCE CLIENT].");
        return;
    }

    const result = await validerFacturationClient(client.id);

    if (result.error) {
        renderMessage(context.screen, "FACTVAL", result.error);
        return;
    }

    const facture = result.data || {};
    const emailStatut = String(facture.email_facture_statut || "NON TENTE").toUpperCase();
    renderMessage(
        context.screen,
        "FACTURE QONTO EMISE",
        [
            `CLIENT ${client.reference_client || ""}`,
            `NUMERO : ${facture.numero || "(ATTRIBUE PAR QONTO)"}`,
            `TOTAL TTC : ${Number(facture.total_ttc || 0).toFixed(2).replace(".", ",")} EUR`,
            `ECHEANCE : ${facture.date_echeance || ""}`,
            facture.deja_creee ? "FACTURE DEJA CREEE - AUCUN DOUBLON." : "FACTURE CREEE DANS QONTO - REVERSEMENT DEBLOQUE.",
            `EMAIL QONTO : ${emailStatut}${facture.email_facture_destinataire ? ` -> ${facture.email_facture_destinataire}` : ""}`,
            emailStatut === "ECHEC" ? "UTILISEZ FACTMAIL POUR RETENTER L'ENVOI SANS RECREER LA FACTURE." : ""
        ].filter(Boolean).join("\n")
    );
}

async function handleFactMail(context) {
    const client = context.currentClient;

    if (!client?.id) {
        renderMessage(context.screen, "FACTMAIL", "AUCUN CLIENT ACTIF. UTILISEZ FACTCLI [REFERENCE CLIENT].");
        return;
    }

    const result = await renvoyerFactureClient(client.id);

    if (result.error) {
        renderMessage(context.screen, "FACTMAIL", result.error);
        return;
    }

    const facture = result.data || {};
    renderMessage(
        context.screen,
        "FACTURE QONTO ENVOYEE",
        [
            `CLIENT ${client.reference_client || ""}`,
            `NUMERO : ${facture.numero || ""}`,
            `DESTINATAIRE : ${facture.email_facture_destinataire || ""}`,
            `STATUT EMAIL : ${facture.email_facture_statut || ""}`,
            "AUCUNE NOUVELLE FACTURE N'A ETE CREEE."
        ].join("\n")
    );
}

async function handleEcMens(args, context) {
    context.setView("ecmens");

    const mois = args[0] || currentEcMensPeriod?.mois;
    const annee = args[1] || currentEcMensPeriod?.annee;

    const result = await getEtatCompteMensuel(mois, annee);

    if (result.error) {
        renderMessage(context.screen, "ECMENS", result.error);
        return;
    }

    currentEcMensPeriod = {
        mois: result.data.mois,
        annee: result.data.annee
    };

    renderEcMensScreen(
        context.screen,
        result.data,
        context.getPage("ecmens")
    );
}

async function handleEcMensNext(context) {
    const nextPage = context.getPage("ecmens") + 1;
    context.setPage("ecmens", nextPage);
    await handleEcMens([], context);
}

async function handleEcMensPrev(context) {
    const prevPage = Math.max(1, context.getPage("ecmens") - 1);
    context.setPage("ecmens", prevPage);
    await handleEcMens([], context);
}

async function handleEcFact(args, context) {
    context.setView("ecfact");

    const reference = args[0] || currentEcFactParams?.referenceClient || context.currentClient?.reference_client;
    const mois = args[1] || currentEcFactParams?.mois;
    const annee = args[2] || currentEcFactParams?.annee;

    if (!reference) {
        renderMessage(context.screen, "ECFACT", "SYNTAXE : ECFACT [REFERENCE CLIENT] [MM] [AAAA]");
        return;
    }

    const result = await getEtatCompteClientMensuel(reference, mois, annee);

    if (result.error) {
        renderMessage(context.screen, "ECFACT", result.error);
        return;
    }

    currentEcFactParams = {
        referenceClient: result.data.client?.reference_client || reference,
        mois: result.data.mois,
        annee: result.data.annee
    };

    currentEcFactData = result.data;

    if (typeof context.setCurrentClient === "function") {
        context.setCurrentClient(result.data.client);
    }

    renderEcFactScreen(
        context.screen,
        result.data,
        context.getPage("ecfact")
    );
}

async function handleEcFactNext(context) {
    const nextPage = context.getPage("ecfact") + 1;
    context.setPage("ecfact", nextPage);
    await handleEcFact([], context);
}

async function handleEcFactPrev(context) {
    const prevPage = Math.max(1, context.getPage("ecfact") - 1);
    context.setPage("ecfact", prevPage);
    await handleEcFact([], context);
}

async function handleEcFactPdf(context) {
    if (!currentEcFactData) {
        renderMessage(context.screen, "ECFACTPDF", "AUCUN ETAT DE COMPTE CLIENT ACTIF. UTILISEZ ECFACT [CLIENT] [MM] [AAAA].");
        return;
    }

    const result = openEcFactPdf(currentEcFactData);

    if (result.error) {
        renderMessage(context.screen, "ECFACTPDF", result.error);
        return;
    }

    renderMessage(context.screen, "ECFACTPDF", "FENETRE D'IMPRESSION OUVERTE. CHOISISSEZ ENREGISTRER EN PDF SI NECESSAIRE.");
}



async function handleRemise(context) {
    const dossier=context.currentDossier;
    if(!dossier){renderMessage(context.screen,"REM","AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");return;}
    const paiements=await getPaiementsByDossier(dossier.id);
    const situation=calculerSituationFinanciere(dossier,paiements.data||[]);
    openRemiseForm(context,dossier,situation,async(values,submitContext)=>{
        const type=String(values.type_remise||"").trim().toUpperCase();
        const montant=Number(String(values.montant||"").replace(/\s/g,"").replace(",","."));
        const motif=String(values.motif||"").trim();
        const accord=["O","OUI"].includes(String(values.accord_mandant||"").trim().toUpperCase());
        if(!["PRINCIPAL","INTERETS","INDEMNITE"].includes(type)){renderMessage(submitContext.screen,"REM","TYPE INVALIDE : PRINCIPAL / INTERETS / INDEMNITE.");return;}
        if(!Number.isFinite(montant)||montant<=0){renderMessage(submitContext.screen,"REM","MONTANT INVALIDE.");return;}
        if(!motif){renderMessage(submitContext.screen,"REM","MOTIF OBLIGATOIRE.");return;}
        const max={PRINCIPAL:situation.principalRestant,INTERETS:situation.totalInterets,INDEMNITE:situation.indemnite40}[type]||0;
        if(montant>max+0.001){renderMessage(submitContext.screen,"REM",`MONTANT SUPERIEUR AU RESTANT ${type} (${formatMoney(max)}).`);return;}
        if(type==="PRINCIPAL"&&!accord){renderMessage(submitContext.screen,"REM","ACCORD MANDANT OBLIGATOIRE POUR UNE REMISE SUR PRINCIPAL.");return;}
        const r=await createRemise({dossierId:dossier.id,typeRemise:type,montant,motif,accordMandant:accord,utilisateurId:submitContext.user?.id});
        if(r.error){renderMessage(submitContext.screen,"REM",r.error);return;}
        await addHistorique({dossierId:dossier.id,typeEvenement:"REM",libelle:`REMISE ${type} ${formatMoney(montant)}`,detail:`${motif}${accord?" - ACCORD MANDANT":""}`,utilisateurId:submitContext.user?.id});
        const fresh=await getDossierByReference(dossier.reference_dossier); if(fresh.data)setContextDossier(submitContext,fresh.data);
        renderMessage(submitContext.screen,"REMISE ENREGISTREE",`${type} : ${formatMoney(montant)} - ${motif}`);
    },cancelContext=>renderMessage(cancelContext.screen,"REM","REMISE ANNULEE."));
}

async function handleRemList(context){
    const dossier=context.currentDossier;
    if(!dossier){renderMessage(context.screen,"REMLIST","AUCUN DOSSIER ACTIF.");return;}
    const r=await getRemisesByDossier(dossier.id); if(r.error){renderMessage(context.screen,"REMLIST",r.error);return;}
    renderRemisesScreen(context.screen,dossier,r.data);
}

async function handleRemAnnul(args,context){
    const dossier=context.currentDossier;
    if(!dossier){renderMessage(context.screen,"REMANNUL","AUCUN DOSSIER ACTIF.");return;}
    const n=Number(args[0]||0); if(!Number.isInteger(n)||n<1){renderMessage(context.screen,"REMANNUL","SYNTAXE : REMANNUL [N° REMLIST]");return;}
    const liste=await getRemisesByDossier(dossier.id); if(liste.error){renderMessage(context.screen,"REMANNUL",liste.error);return;}
    const remise=liste.data[n-1]; if(!remise){renderMessage(context.screen,"REMANNUL","NUMERO DE REMISE INVALIDE.");return;}
    if(String(remise.statut).toUpperCase()!=="ACTIVE"){renderMessage(context.screen,"REMANNUL","CETTE REMISE EST DEJA ANNULEE.");return;}
    const r=await annulerRemise(remise.id,context.user?.id); if(r.error){renderMessage(context.screen,"REMANNUL",r.error);return;}
    await addHistorique({dossierId:dossier.id,typeEvenement:"REM",libelle:`ANNULATION REMISE ${String(remise.type_remise).toUpperCase()} ${formatMoney(remise.montant)}`,detail:String(remise.motif||""),utilisateurId:context.user?.id});
    const fresh=await getDossierByReference(dossier.reference_dossier); if(fresh.data)setContextDossier(context,fresh.data);
    renderMessage(context.screen,"REMISE ANNULEE",`${String(remise.type_remise).toUpperCase()} : ${formatMoney(remise.montant)}`);
}

async function handleCompta(context) {
    context.setView("compta");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "COMPTA", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);
    const promesses = await getPromessesByDossier(dossier.id);

    const situation = calculerSituationFinanciere(
        dossier,
        paiements.data || []
    );

    renderComptaScreen(
        context.screen,
        dossier,
        situation,
        paiements.data || [],
        promesses.data || [],
        context.getPage("compta")
    );
}

async function handleComptaNext(context) {
    const nextPage = context.getPage("compta") + 1;
    context.setPage("compta", nextPage);
    await handleCompta(context);
}

async function handleComptaPrev(context) {
    const prevPage = Math.max(1, context.getPage("compta") - 1);
    context.setPage("compta", prevPage);
    await handleCompta(context);
}


async function handleTaux(context) {
    const r=await getTousTauxInteretsLegaux();
    if(r.error){renderMessage(context.screen,"TAUX","IMPOSSIBLE DE CHARGER LES TAUX LEGAUX.");return;}
    const rows=(r.data||[]).map(x=>`${String(x.date_debut).padEnd(12)} ${String(x.date_fin).padEnd(12)} ${String(x.categorie).padEnd(20)} ${Number(x.taux).toFixed(2).replace('.',',').padStart(7)} %  ${String(x.statut).padEnd(10)} ${x.source_reference||''}`);
    context.screen.innerHTML=`<pre class="terminal-table">================ TAUX D'INTERET LEGAL ================\n\nDEBUT        FIN          CATEGORIE               TAUX      STATUT     SOURCE\n--------------------------------------------------------------------------------\n${rows.join("\n")||"AUCUN TAUX."}\n--------------------------------------------------------------------------------\nTAUXVAL AAAA S1|S2    VALIDER UNE PERIODE DETECTEE (ADMIN)\n===========================================================</pre>`;
}
async function handleTauxVal(args, context) {
    if(String(context.profile?.role||context.userProfile?.role||'').toUpperCase()!=="ADMIN"){renderMessage(context.screen,"TAUXVAL","COMMANDE RESERVEE AUX ADMINISTRATEURS.");return;}
    const a=String(args[0]||''); const sem=String(args[1]||'').toUpperCase();
    if(!/^\d{4}$/.test(a)||!/^S[12]$/.test(sem)){renderMessage(context.screen,"TAUXVAL","SYNTAXE : TAUXVAL AAAA S1|S2");return;}
    const r=await validerTauxPeriode(Number(a),Number(sem.slice(1)),context.user?.id);
    if(r.error){renderMessage(context.screen,"TAUXVAL","IMPOSSIBLE DE VALIDER LES TAUX.");return;}
    renderMessage(context.screen,"TAUXVAL",`${r.data.length} TAUX VALIDE(S) POUR ${a} ${sem}.`);
}

async function handleIntDet(context) {
    context.setView("interets");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "INTDET", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);

    const situation = calculerSituationFinanciere(
        dossier,
        paiements.data || []
    );

    renderInteretsScreen(
        context.screen,
        dossier,
        situation,
        context.getPage("interets")
    );
}

async function handleIntDetNext(context) {
    const nextPage = context.getPage("interets") + 1;
    context.setPage("interets", nextPage);
    await handleIntDet(context);
}

async function handleIntDetPrev(context) {
    const prevPage = Math.max(1, context.getPage("interets") - 1);
    context.setPage("interets", prevPage);
    await handleIntDet(context);
}




async function handleFrais(context) {
    context.setView("frais");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "FRAIS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getFraisByDossier(
        dossier.id,
        context.getPage("frais")
    );

    if (result.error) {
        renderMessage(context.screen, "FRAIS", result.error);
        return;
    }

    renderFraisScreen(
        context.screen,
        dossier,
        result.data,
        result.page,
        result.totalPages,
        result.count,
        result.totals
    );
}

async function handleFraisNext(context) {
    const nextPage = context.getPage("frais") + 1;
    context.setPage("frais", nextPage);
    await handleFrais(context);
}

async function handleFraisPrev(context) {
    const prevPage = Math.max(1, context.getPage("frais") - 1);
    context.setPage("frais", prevPage);
    await handleFrais(context);
}

async function handleAddFrais(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "ADDFRAIS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    openFraisForm(
        context,
        "ADDFRAIS",
        dossier,
        null,
        async (values, submitContext) => {
            await submitAddFrais(values, submitContext, dossier);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDFRAIS", "AJOUT FRAIS ANNULE.");
        }
    );
}

async function submitAddFrais(values, context, dossier) {
    const result = await createFraisDossier({
        dossier,
        values
    });

    if (result.error) {
        renderMessage(context.screen, "ADDFRAIS", result.error);
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "FRAIS",
        libelle: `FRAIS AJOUTE ${formatMoney(result.data.montant_ttc)}`,
        detail: `${result.data.type_frais || ""} ${result.data.libelle || ""}`.trim(),
        utilisateurId: context.user?.id
    });

    context.resetPage("frais");
    await handleFrais(context);
}

async function handleModFrais(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "MODFRAIS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getFraisByDossier(dossier.id, 1, 50);

    if (result.error) {
        renderMessage(context.screen, "MODFRAIS", result.error);
        return;
    }

    if (!result.data.length) {
        renderMessage(context.screen, "MODFRAIS", "AUCUN FRAIS A MODIFIER.");
        return;
    }

    openFraisSelectionForm(
        context,
        "MODFRAIS",
        dossier,
        result.data,
        async (values, submitContext) => {
            await submitModFraisSelection(values, submitContext, dossier, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODFRAIS", "MODIFICATION FRAIS ANNULEE.");
        }
    );
}

async function submitModFraisSelection(values, context, dossier, fraisListe) {
    const numero = Number(values.numero_frais || 0);
    const frais = fraisListe[numero - 1];

    if (!frais) {
        renderMessage(context.screen, "MODFRAIS", "NUMERO FRAIS INVALIDE.");
        return;
    }

    const fraisComplet = await getFraisById(frais.id);

    if (fraisComplet.error) {
        renderMessage(context.screen, "MODFRAIS", fraisComplet.error);
        return;
    }

    openFraisForm(
        context,
        "MODFRAIS",
        dossier,
        fraisComplet.data,
        async (formValues, submitContext) => {
            await submitModFrais(formValues, submitContext, dossier, fraisComplet.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODFRAIS", "MODIFICATION FRAIS ANNULEE.");
        }
    );
}

async function submitModFrais(values, context, dossier, frais) {
    const result = await updateFraisDossier(
        frais.id,
        dossier,
        values
    );

    if (result.error) {
        renderMessage(context.screen, "MODFRAIS", result.error);
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "FRAIS",
        libelle: `FRAIS MODIFIE ${formatMoney(result.data.montant_ttc)}`,
        detail: `${result.data.type_frais || ""} ${result.data.libelle || ""}`.trim(),
        utilisateurId: context.user?.id
    });

    await handleFrais(context);
}

async function handleDelFrais(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "DELFRAIS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getFraisByDossier(dossier.id, 1, 50);

    if (result.error) {
        renderMessage(context.screen, "DELFRAIS", result.error);
        return;
    }

    if (!result.data.length) {
        renderMessage(context.screen, "DELFRAIS", "AUCUN FRAIS A SUPPRIMER.");
        return;
    }

    openFraisSelectionForm(
        context,
        "DELFRAIS",
        dossier,
        result.data,
        async (values, submitContext) => {
            await submitDelFraisSelection(values, submitContext, dossier, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELFRAIS", "SUPPRESSION FRAIS ANNULEE.");
        }
    );
}

async function submitDelFraisSelection(values, context, dossier, fraisListe) {
    const numero = Number(values.numero_frais || 0);
    const frais = fraisListe[numero - 1];

    if (!frais) {
        renderMessage(context.screen, "DELFRAIS", "NUMERO FRAIS INVALIDE.");
        return;
    }

    openDelFraisForm(
        context,
        dossier,
        frais,
        async (formValues, submitContext) => {
            await submitDelFrais(formValues, submitContext, dossier, frais);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "DELFRAIS", "SUPPRESSION FRAIS ANNULEE.");
        }
    );
}

async function submitDelFrais(values, context, dossier, frais) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "DELFRAIS", "SUPPRESSION NON CONFIRMEE.");
        return;
    }

    const result = await deleteFraisDossier(frais.id);

    if (result.error) {
        renderMessage(context.screen, "DELFRAIS", result.error);
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "FRAIS",
        libelle: `FRAIS SUPPRIME ${formatMoney(frais.montant_ttc)}`,
        detail: `${frais.type_frais || ""} ${frais.libelle || ""}`.trim(),
        utilisateurId: context.user?.id
    });

    await handleFrais(context);
}

async function handleHonoraires(context) {
    context.setView("honoraires");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "HON", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getHonorairesByDossier(
        dossier.id,
        context.getPage("honoraires")
    );

    if (result.error) {
        renderMessage(context.screen, "HON", result.error);
        return;
    }

    renderHonorairesScreen(
        context.screen,
        dossier,
        result.data,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleHonorairesNext(context) {
    const nextPage = context.getPage("honoraires") + 1;
    context.setPage("honoraires", nextPage);
    await handleHonoraires(context);
}

async function handleHonorairesPrev(context) {
    const prevPage = Math.max(1, context.getPage("honoraires") - 1);
    context.setPage("honoraires", prevPage);
    await handleHonoraires(context);
}

async function creerHonorairePaiement(dossier, paiement, montant, contexte) {
    const result = await calculerEtCreerHonorairePaiement({
        dossier,
        paiement,
        montant,
        commentaire: contexte
    });

    if (result.error) {
        console.error("ERREUR HONORAIRE :", result.error);
    }

    return result;
}


async function synchroniserStatutSoldeDossier(context, dossier) {
    if (!dossier?.id) {
        return { error: null };
    }

    let dossierCourant = dossier;

    if (dossier.reference_dossier) {
        const fresh = await getDossierByReference(dossier.reference_dossier);
        if (!fresh.error && fresh.data) {
            dossierCourant = fresh.data;
        }
    }

    const paiements = await getPaiementsByDossier(dossierCourant.id);

    if (paiements.error) {
        return { error: paiements.error };
    }

    const situation = calculerSituationFinanciere(
        dossierCourant,
        paiements.data || []
    );

    const totalRestantDu = Number(situation.totalRestantDu || 0);
    const statutActuel = String(dossierCourant.statut_code || "").toUpperCase();

    if (totalRestantDu <= 0.005 && statutActuel !== "SOLDE") {
        const update = await updateRappelDossier({
            dossierId: dossierCourant.id,
            dateRappel: null,
            motifRappel: "DOSSIER SOLDE",
            statutCode: "SOLDE"
        });

        if (update.error) {
            return { error: update.error };
        }

        if (update.data && context?.currentDossier?.id === dossierCourant.id) {
            setContextDossier(context, update.data);
        }

        await addHistorique({
            dossierId: dossierCourant.id,
            typeEvenement: "SOLDE",
            libelle: "DOSSIER SOLDE AUTOMATIQUEMENT",
            detail: `TOTAL RESTANT DU ${formatMoney(totalRestantDu)}`,
            utilisateurId: context?.user?.id
        });

        return { error: null, updated: true, statut: "SOLDE" };
    }

    if (totalRestantDu > 0.005 && statutActuel === "SOLDE") {
        const update = await updateStatutDossier({
            dossierId: dossierCourant.id,
            statutCode: "AMIABLE"
        });

        if (update.error) {
            return { error: update.error };
        }

        if (update.data && context?.currentDossier?.id === dossierCourant.id) {
            setContextDossier(context, update.data);
        }

        await addHistorique({
            dossierId: dossierCourant.id,
            typeEvenement: "STATUT",
            libelle: "DOSSIER REOUVERT AUTOMATIQUEMENT",
            detail: `TOTAL RESTANT DU ${formatMoney(totalRestantDu)}`,
            utilisateurId: context?.user?.id
        });

        return { error: null, updated: true, statut: "AMIABLE" };
    }

    return { error: null, updated: false, statut: statutActuel };
}

async function handleEcheancier(context) {
    context.setView("echeanciers");

    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "ECH", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getEcheancierDossier(
        dossier.id,
        context.getPage("echeanciers")
    );

    if (result.error) {
        renderMessage(context.screen, "ECH", result.error);
        return;
    }

    renderEcheancierScreen(
        context.screen,
        dossier,
        result.data,
        result.lignes,
        result.page,
        result.totalPages,
        result.count
    );
}

async function handleEcheancierNext(context) {
    const nextPage = context.getPage("echeanciers") + 1;
    context.setPage("echeanciers", nextPage);
    await handleEcheancier(context);
}

async function handleEcheancierPrev(context) {
    const prevPage = Math.max(1, context.getPage("echeanciers") - 1);
    context.setPage("echeanciers", prevPage);
    await handleEcheancier(context);
}

async function handleAddEcheancier(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "ADDECH", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);
    const situation = calculerSituationFinanciere(
        dossier,
        paiements.data || []
    );

    openAddEcheancierForm(
        context,
        dossier,
        situation,
        async (values, submitContext) => {
            await submitAddEcheancier(values, submitContext, dossier);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDECH", "CREATION ECHEANCIER ANNULEE.");
        }
    );
}

async function submitAddEcheancier(values, context, dossier) {
    const montantTotal = numberOrNull(values.montant_total);
    const nombreEcheances = Number(values.nombre_echeances || 0);
    const periodicite = textOrCurrent(values.periodicite, "MENSUEL");
    const datePremiereEcheance = dateOrNull(values.date_premiere_echeance);
    const envoiCentralPay = textOrCurrent(values.envoi_centralpay, "AUCUN");
    const modePaiementSaisi = textOrCurrent(values.mode_paiement, "SEPA");
    const modePaiement = envoiCentralPay === "AUCUN"
        ? modePaiementSaisi
        : "CARTE BANCAIRE";
    const commentaire = textOrNull(values.commentaire);

    if (envoiCentralPay !== "AUCUN") {
        const debiteur = dossier.debiteurs || {};
        const email = String(debiteur.email || "").trim();
        const telephone = String(
            debiteur.telephone_mobile ||
            debiteur.telephone_fixe ||
            ""
        ).trim();

        if (!email) {
            renderMessage(
                context.screen,
                "ADDECH",
                "EMAIL DEBITEUR OBLIGATOIRE POUR CREER UN ECHEANCIER CENTRALPAY."
            );
            return;
        }

        if (
            (envoiCentralPay === "SMS" || envoiCentralPay === "SMS + MAIL") &&
            !telephone
        ) {
            renderMessage(
                context.screen,
                "ADDECH",
                "TELEPHONE DEBITEUR MANQUANT POUR L'ENVOI SMS."
            );
            return;
        }
    }

    const result = await createEcheancier({
        dossierId: dossier.id,
        montantTotal,
        nombreEcheances,
        periodicite,
        datePremiereEcheance,
        modePaiement,
        commentaire,
        userId: context.user?.id
    });

    if (result.error) {
        renderMessage(context.screen, "ADDECH", result.error);
        return;
    }

    const statutUpdate = await updateStatutDossier({
        dossierId: dossier.id,
        statutCode: "ECHEANCIER"
    });

    if (statutUpdate.data) {
        setContextDossier(context, statutUpdate.data);
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "ECH",
        libelle: `ECHEANCIER CREE ${formatMoney(montantTotal)}`,
        detail: `${nombreEcheances} ECHEANCES - ${periodicite} - ${modePaiement}`,
        utilisateurId: context.user?.id
    });

    if (envoiCentralPay !== "AUCUN") {
        const envoi = await envoyerLienCentralPayEcheancier({
            context,
            dossier: statutUpdate.data || dossier,
            montantTotal,
            nombreEcheances,
            periodicite,
            datePremiereEcheance,
            envoi: envoiCentralPay
        });

        if (envoi.error) {
            await addHistorique({
                dossierId: dossier.id,
                typeEvenement: "ECH",
                libelle: "ECHEANCIER CREE - ENVOI CENTRALPAY EN ECHEC",
                detail: envoi.error,
                utilisateurId: context.user?.id
            });

            renderMessage(
                context.screen,
                "ADDECH",
                `ECHEANCIER CREE. ENVOI CENTRALPAY NON EFFECTUE : ${envoi.error}`
            );
            return;
        }
    }

    context.resetPage("echeanciers");
    await handleEcheancier(context);
}

async function envoyerLienCentralPayEcheancier({
    context,
    dossier,
    montantTotal,
    nombreEcheances,
    periodicite,
    datePremiereEcheance,
    envoi
}) {
    const mapping = centralPayPeriodicite(periodicite);

    const paiements = await getPaiementsByDossier(dossier.id);
    const situation = calculerSituationFinanciere(
        dossier,
        paiements.data || []
    );

    const centralPay = await createCentralPayLink({
        dossier,
        situation,
        montant: montantTotal,
        installmentCount: nombreEcheances,
        installmentIntervalUnit: mapping.unit,
        installmentIntervalCount: mapping.count,
        installmentStartingDate: datePremiereEcheance
    });

    if (centralPay.error || !centralPay.shortUrl || !centralPay.smsUrl) {
        return {
            error: centralPay.error || "LIEN CENTRALPAY NON CREE."
        };
    }

    const debiteur = dossier.debiteurs || {};
    const telephone = String(
        debiteur.telephone_mobile ||
        debiteur.telephone_fixe ||
        ""
    ).trim();
    const email = String(debiteur.email || "").trim();
    const montantFormate = formatMoney(montantTotal);
    const dateFormatee = formatDate(datePremiereEcheance);

    if (envoi === "SMS" || envoi === "SMS + MAIL") {
        const modeleSms = {
            id: null,
            code_modele: "ECHCP",
            libelle: "ECHEANCIER CENTRALPAY"
        };
        const message =
            `RECOVIA - Dossier ${dossier.reference_dossier} : ` +
            `conformement a notre accord, reglez ${montantFormate} ` +
            `en ${nombreEcheances} echeances a compter du ${dateFormatee}. ` +
            `${centralPay.smsUrl} - Tel. 01 75 43 88 22`;

        const sms = await sendSmsDossier({
            dossier,
            modele: modeleSms,
            telephone,
            message,
            userId: context.user?.id
        });

        if (sms.error) {
            return { error: sms.error };
        }

        await addHistorique({
            dossierId: dossier.id,
            typeEvenement: "SMS",
            libelle: "LIEN ECHEANCIER CENTRALPAY ENVOYE PAR SMS",
            detail: `${nombreEcheances} ECHEANCES - ${periodicite}`,
            utilisateurId: context.user?.id
        });
    }

    if (envoi === "MAIL" || envoi === "SMS + MAIL") {
        const modeleMail = {
            id: null,
            code_modele: "ECHCP",
            libelle: "Echeancier CentralPay"
        };
        const sujet = `Mise en place de votre echeancier - dossier ${dossier.reference_dossier}`;
        const contenu = `Bonjour,

Conformement a notre accord, nous vous confirmons la mise en place d'un echeancier de ${montantFormate} en ${nombreEcheances} echeances, a compter du ${dateFormatee}.

Vous pouvez enregistrer votre carte et valider cet echeancier en utilisant le bouton de paiement ci-dessous.

Ce paiement fractionne est sans frais supplementaires.

Cordialement,
Service Recouvrement
RECOVIA`;

        const mail = await sendEmailDossier({
            dossier,
            modele: modeleMail,
            emailDestinataire: email,
            sujet,
            contenu,
            montantDu: montantFormate,
            situation,
            paymentUrlOverride: centralPay.shortUrl,
            montantPaiementOverride: montantTotal
        });

        if (mail.error) {
            return { error: mail.error };
        }

        await addHistorique({
            dossierId: dossier.id,
            typeEvenement: "EMAIL",
            libelle: "LIEN ECHEANCIER CENTRALPAY ENVOYE PAR EMAIL",
            detail: `${email} - ${nombreEcheances} ECHEANCES - ${periodicite}`,
            utilisateurId: context.user?.id
        });
    }

    return { error: null };
}

function centralPayPeriodicite(periodicite) {
    const mode = String(periodicite || "MENSUEL").toUpperCase();

    if (mode === "HEBDOMADAIRE") {
        return { unit: "WEEK", count: 1 };
    }

    if (mode === "QUINZAINE") {
        return { unit: "WEEK", count: 2 };
    }

    return { unit: "MONTH", count: 1 };
}

async function handleModifEcheancier(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "MODECH", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getEcheancierActif(dossier.id);

    if (result.error) {
        renderMessage(context.screen, "MODECH", result.error);
        return;
    }

    if (!result.data) {
        renderMessage(context.screen, "MODECH", "AUCUN ECHEANCIER ACTIF A MODIFIER.");
        return;
    }

    const paiements = await getPaiementsByDossier(dossier.id);
    const situation = calculerSituationFinanciere(
        dossier,
        paiements.data || []
    );

    openAddEcheancierForm(
        context,
        dossier,
        situation,
        async (values, submitContext) => {
            await submitModifEcheancier(values, submitContext, dossier, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODECH", "MODIFICATION ECHEANCIER ANNULEE.");
        },
        {
            title: `============================== MODECH ${String(dossier.reference_dossier || "").toUpperCase()} ==============================`,
            defaults: {
                montant_total: formatNumberForInput(result.data.montant_total),
                nombre_echeances: String(result.data.nombre_echeances || ""),
                periodicite: result.data.periodicite || "MENSUEL",
                date_premiere_echeance: formatDate(result.data.date_premiere_echeance),
                mode_paiement: result.data.mode_paiement || "SEPA",
                envoi_centralpay: "AUCUN",
                commentaire: result.data.commentaire || ""
            }
        }
    );
}

async function submitModifEcheancier(values, context, dossier, echeancierActif) {
    const annulation = await annulerEcheancier(echeancierActif.id);

    if (annulation.error) {
        renderMessage(context.screen, "MODECH", annulation.error);
        return;
    }

    const montantTotal = numberOrNull(values.montant_total);
    const nombreEcheances = Number(values.nombre_echeances || 0);
    const periodicite = textOrCurrent(values.periodicite, "MENSUEL");
    const datePremiereEcheance = dateOrNull(values.date_premiere_echeance);
    const modePaiement = textOrCurrent(values.mode_paiement, "SEPA");
    const commentaire = textOrNull(values.commentaire);

    const creation = await createEcheancier({
        dossierId: dossier.id,
        montantTotal,
        nombreEcheances,
        periodicite,
        datePremiereEcheance,
        modePaiement,
        commentaire,
        userId: context.user?.id
    });

    if (creation.error) {
        renderMessage(context.screen, "MODECH", creation.error);
        return;
    }

    const statutUpdate = await updateStatutDossier({
        dossierId: dossier.id,
        statutCode: "ECHEANCIER"
    });

    if (statutUpdate.data) {
        setContextDossier(context, statutUpdate.data);
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "ECH",
        libelle: "ECHEANCIER MODIFIE",
        detail: `${formatMoney(montantTotal)} - ${nombreEcheances} ECHEANCES - ${periodicite} - ${modePaiement}`,
        utilisateurId: context.user?.id
    });

    context.resetPage("echeanciers");
    await handleEcheancier(context);
}

async function handleAnnulEcheancier(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "ECHANNUL", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getEcheancierActif(dossier.id);

    if (result.error) {
        renderMessage(context.screen, "ECHANNUL", result.error);
        return;
    }

    if (!result.data) {
        renderMessage(context.screen, "ECHANNUL", "AUCUN ECHEANCIER ACTIF A ANNULER.");
        return;
    }

    openAnnulEcheancierForm(
        context,
        dossier,
        result.data,
        async (values, submitContext) => {
            await submitAnnulEcheancier(values, submitContext, dossier, result.data);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ECHANNUL", "ANNULATION ECHEANCIER ABANDONNEE.");
        }
    );
}

async function submitAnnulEcheancier(values, context, dossier, echeancier) {
    const confirmation = String(values.confirmation || "").trim().toUpperCase();

    if (confirmation !== "O" && confirmation !== "OUI") {
        renderMessage(context.screen, "ECHANNUL", "ANNULATION NON CONFIRMEE.");
        return;
    }

    const result = await annulerEcheancier(echeancier.id);

    if (result.error) {
        renderMessage(context.screen, "ECHANNUL", result.error);
        return;
    }

    const statutUpdate = await updateStatutDossier({
        dossierId: dossier.id,
        statutCode: "AMIABLE"
    });

    if (statutUpdate.data) {
        setContextDossier(context, statutUpdate.data);
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "ECH",
        libelle: "ECHEANCIER ANNULE",
        detail: values.motif || "ANNULATION OPERATEUR",
        utilisateurId: context.user?.id
    });

    context.resetPage("echeanciers");
    await handleEcheancier(context);
}

async function handlePayEcheancier(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "ECHPAY", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const result = await getEcheancierActif(dossier.id, 1, 200);

    if (result.error) {
        renderMessage(context.screen, "ECHPAY", result.error);
        return;
    }

    if (!result.data) {
        renderMessage(context.screen, "ECHPAY", "AUCUN ECHEANCIER ACTIF SUR CE DOSSIER.");
        return;
    }

    const lignes = result.lignes || [];

    if (!lignes.length) {
        renderMessage(context.screen, "ECHPAY", "AUCUNE ECHEANCE A REGLER.");
        return;
    }

    openEcheancierPayForm(
        context,
        dossier,
        result.data,
        lignes,
        async (values, submitContext) => {
            await submitPayEcheancier(values, submitContext, dossier, result.data, lignes);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ECHPAY", "PAIEMENT ECHEANCE ANNULE.");
        }
    );
}

async function submitPayEcheancier(values, context, dossier, echeancier, lignes) {
    const numero = Number(values.numero_echeance || 0);
    const ligne = lignes.find((item) => Number(item.numero) === numero);

    if (!ligne) {
        renderMessage(context.screen, "ECHPAY", "NUMERO ECHEANCE INVALIDE.");
        return;
    }

    if (ligne.paye || ligne.statut === "PAYEE") {
        renderMessage(context.screen, "ECHPAY", "ECHEANCE DEJA PAYEE.");
        return;
    }

    const modePaiement = textOrCurrent(values.mode_paiement, echeancier.mode_paiement || "SEPA");
    const referencePaiement = textOrNull(values.reference_paiement) || `ECH${ligne.numero}`;
    const commentaire = textOrNull(values.commentaire) || `PAIEMENT ECHEANCE N°${ligne.numero}`;
    const montant = Math.max(
        0,
        Number(ligne.montant || 0) - Number(ligne.montant_paye || 0)
    );

    if (!montant) {
        renderMessage(context.screen, "ECHPAY", "ECHEANCE DEJA SOLDEE.");
        return;
    }

    const paiement = await createPaiement({
        dossierId: dossier.id,
        montant,
        modePaiement,
        referencePaiement,
        commentaire,
        userId: context.user?.id
    });

    if (paiement.error) {
        renderMessage(context.screen, "ECHPAY", paiement.error);
        return;
    }

    const affectation = await affecterPaiementAuxEcheances({
        dossierId: dossier.id,
        paiementId: paiement.data.id,
        montant
    });

    if (affectation.error) {
        renderMessage(context.screen, "ECHPAY", affectation.error);
        return;
    }

    await creerHonorairePaiement(
        dossier,
        paiement.data,
        montant,
        `ECHPAY ECHEANCE N°${ligne.numero}`
    );

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "ECHPAY",
        libelle: `PAIEMENT ECHEANCIER ${formatMoney(montant)}`,
        detail: `${modePaiement} ${referencePaiement} ${commentaire}`.trim(),
        utilisateurId: context.user?.id
    });

    const syncSolde = await synchroniserStatutSoldeDossier(context, dossier);

    if (syncSolde.error) {
        renderMessage(context.screen, "ECHPAY", syncSolde.error);
        return;
    }

    context.resetPage("echeanciers");
    await handleEcheancier(context);
}




async function handleAddDossier(context) {
    const tarifs = await getTarifOptions();

    if (tarifs.error) {
        renderMessage(context.screen, "ADDOS", tarifs.error);
        return;
    }

    openAddDossierForm(
        context,
        async (values, submitContext) => {
            await submitAddDossier(values, submitContext);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "ADDOS", "CREATION DOSSIER ANNULEE.");
        },
        {
            tarifOptions: tarifs.options
        }
    );
}

async function submitAddDossier(values, context) {
    const referenceClient = textOrNull(values.reference_client);
    const nomDebiteur = textOrNull(values.nom);
    const montantPrincipal = numberOrNull(values.montant_principal_initial);

    if (!referenceClient || !nomDebiteur || !montantPrincipal || montantPrincipal <= 0) {
        renderMessage(
            context.screen,
            "ADDOS",
            "REFERENCE CLIENT, NOM DEBITEUR ET MONTANT PRINCIPAL SONT OBLIGATOIRES."
        );
        return;
    }

    const typeDebiteurSaisi = textOrNull(values.type_debiteur) || "PARTICULIER";
    const sirenSaisi = normalizeSiren(values.siren);
    if (values.siren && !sirenSaisi) {
        renderMessage(context.screen, "ADDOS", "SIREN INVALIDE : 9 CHIFFRES ATTENDUS.");
        return;
    }
    let typeInteretSaisi = textOrNull(values.type_interet) || "LEGAL";
    const echeanceFactureSaisie = dateOrNull(values.date_echeance_facture);

    // Par defaut, une creance contre un professionnel utilise le regime B2B suppletif.
    // CONTRACTUEL et AUCUN restent des choix explicites de l'utilisateur.
    if (typeDebiteurSaisi === "PROFESSIONNEL" && typeInteretSaisi === "LEGAL") {
        typeInteretSaisi = "B2B_AUTO";
    }
    if (typeDebiteurSaisi === "PROFESSIONNEL" && ["B2B_AUTO", "CONTRACTUEL"].includes(typeInteretSaisi) && !echeanceFactureSaisie) {
        renderMessage(context.screen, "ADDOS", "ECHEANCE FACTURE OBLIGATOIRE POUR UN DOSSIER B2B.");
        return;
    }

    const creation = await createDossierComplet({
        dossierValues: {
            reference_dossier: textOrNull(values.reference_dossier),
            reference_client: referenceClient,
            numero_facture: textOrNull(values.numero_facture),
            tarif_honoraires_code: textOrNull(values.tarif_honoraires_code),
            statut_code: textOrCurrent(values.statut_code, "AMIABLE"),
            priorite: textOrCurrent(values.priorite, "NORMALE"),
            montant_principal_initial: montantPrincipal,
            date_creance: dateOrNull(values.date_creance),
            date_prescription: dateOrNull(values.date_prescription),
            date_rappel: dateOrNull(values.date_rappel),
            motif_rappel: textOrNull(values.motif_rappel),
            type_interet: typeInteretSaisi,
            taux_interet: numberOrNull(values.taux_interet),
            categorie_taux_legal: textOrCurrent(values.categorie_taux_legal, "AUTRES"),
            date_depart_interets: dateOrNull(values.date_depart_interets),
            date_echeance_facture: echeanceFactureSaisie,
            med_envoyee: yesNoToBoolean(values.med_envoyee),
            date_mise_en_demeure: dateOrNull(values.date_mise_en_demeure),
            indemnite_40_euros: yesNoToBoolean(values.indemnite_40_euros),
            observations: textOrNull(values.observations)
        },
        debiteurValues: {
            type_debiteur: typeDebiteurSaisi,
            siren: sirenSaisi,
            nom: nomDebiteur,
            prenom: textOrNull(values.prenom),
            adresse: textOrNull(values.adresse),
            adresse_ligne_2: textOrNull(values.adresse_ligne_2),
            code_postal: textOrNull(values.code_postal),
            ville: textOrNull(values.ville),
            pays: textOrNull(values.pays) || "FRANCE",
            telephone_fixe: textOrNull(values.telephone_fixe),
            telephone_mobile: textOrNull(values.telephone_mobile),
            email: textOrNull(values.email),
            employeur: textOrNull(values.employeur),
            iban: normalizeIban(values.iban),
            bic: textOrNull(values.bic),
            mandat_sepa_reference: textOrNull(values.mandat_sepa_reference),
            mandat_sepa_date_signature: dateOrNull(values.mandat_sepa_date_signature)
        }
    });

    if (creation.error) {
        renderMessage(context.screen, "ADDOS", creation.error);
        return;
    }

    await addHistorique({
        dossierId: creation.data.id,
        typeEvenement: "ADDOS",
        libelle: "DOSSIER CREE",
        detail: "CREATION MANUELLE",
        utilisateurId: context.user?.id
    });

    await renderDossierAvecSituation(context, creation.data);
}


async function handleFacture(args, context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "FACTURE", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const saisie = String(args || "").trim();

    if (!saisie) {
        renderMessage(
            context.screen,
            "FACTURE",
            [
                `DOSSIER : ${dossier.reference_dossier}`,
                `N° FACTURE : ${dossier.numero_facture || "NON RENSEIGNE"}`,
                "",
                "UTILISATION : FACTURE <NUMERO>",
                "POUR EFFACER : FACTURE -"
            ].join("\n")
        );
        return;
    }

    const numeroFacture = ["-", "VIDE", "AUCUN", "SUPPRIMER"].includes(saisie.toUpperCase())
        ? null
        : saisie.slice(0, 100);

    const result = await updateNumeroFactureDossier({
        dossierId: dossier.id,
        numeroFacture
    });

    if (result.error || !result.data) {
        renderMessage(context.screen, "FACTURE", result.error || "MISE A JOUR IMPOSSIBLE.");
        return;
    }

    await addHistorique({
        dossierId: dossier.id,
        typeEvenement: "FACTURE",
        libelle: numeroFacture ? "NUMERO FACTURE MIS A JOUR" : "NUMERO FACTURE EFFACE",
        detail: numeroFacture || "-",
        utilisateurId: context.user?.id
    });

    context.currentDossier = result.data;
    await renderDossierAvecSituation(context, result.data);
}

async function handleModdos(context) {
    const dossier = context.currentDossier;

    if (!dossier) {
        renderMessage(context.screen, "MODDOS", "AUCUN DOSSIER ACTIF. UTILISEZ DOS OU NEXT.");
        return;
    }

    const tarifs = await getTarifOptions();

    if (tarifs.error) {
        renderMessage(context.screen, "MODDOS", tarifs.error);
        return;
    }

    const tarifDossierCode = await getTarifCodeById(dossier.tarif_honoraires_id);
    const dossierForm = {
        ...dossier,
        tarif_honoraires_code: tarifDossierCode
    };

    openModdosForm(
        context,
        dossierForm,
        async (values, submitContext) => {
            await submitModdos(values, submitContext, dossier);
        },
        (cancelContext) => {
            renderMessage(cancelContext.screen, "MODDOS", "MODIFICATION ANNULEE.");
        },
        {
            tarifOptions: tarifs.options
        }
    );
}

async function submitModdos(values, context, originalDossier) {
    const debiteur = originalDossier.debiteurs || {};
    const referenceClient = textOrCurrent(values.reference_client, originalDossier.reference_client);

    let creancierId = originalDossier.creancier_id || null;
    let referenceClientValidee = referenceClient || null;

    if (referenceClientValidee) {
        const clientResult = await getClientByReference(referenceClientValidee);

        if (clientResult.error || !clientResult.data) {
            renderMessage(
                context.screen,
                "MODDOS",
                `CLIENT INTROUVABLE : ${referenceClientValidee}. MODIFICATION ANNULEE.`
            );
            return;
        }

        creancierId = clientResult.data.id;
        referenceClientValidee = clientResult.data.reference_client;
    }

    const tarifDossierCode = textOrNull(values.tarif_honoraires_code);
    let tarifHonorairesId = null;

    if (tarifDossierCode) {
        const tarifResult = await getTarifByCode(tarifDossierCode);

        if (tarifResult.error || !tarifResult.data || tarifResult.data.actif === false) {
            renderMessage(
                context.screen,
                "MODDOS",
                `TARIF INTROUVABLE OU INACTIF : ${tarifDossierCode}. MODIFICATION ANNULEE.`
            );
            return;
        }

        tarifHonorairesId = tarifResult.data.id;
    }

    const typeDebiteurSaisi = textOrNull(values.type_debiteur) || String(debiteur.type_debiteur || "PARTICULIER").toUpperCase();
    const sirenSaisi = normalizeSiren(values.siren);
    if (values.siren && !sirenSaisi) {
        renderMessage(context.screen, "MODDOS", "SIREN INVALIDE : 9 CHIFFRES ATTENDUS.");
        return;
    }
    let typeInteretSaisi = textOrNull(values.type_interet) || originalDossier.type_interet || "LEGAL";
    const echeanceFactureSaisie = dateOrNull(values.date_echeance_facture);

    if (typeDebiteurSaisi === "PROFESSIONNEL" && typeInteretSaisi === "LEGAL") {
        typeInteretSaisi = "B2B_AUTO";
    }
    if (typeDebiteurSaisi === "PROFESSIONNEL" && ["B2B_AUTO", "CONTRACTUEL"].includes(typeInteretSaisi) && !echeanceFactureSaisie) {
        renderMessage(context.screen, "MODDOS", "ECHEANCE FACTURE OBLIGATOIRE POUR UN DOSSIER B2B.");
        return;
    }

    const dossierValues = {
        reference_dossier: textOrCurrent(values.reference_dossier, originalDossier.reference_dossier),
        reference_client: referenceClientValidee,
        numero_facture: textOrNull(values.numero_facture),
        creancier_id: creancierId,
        tarif_honoraires_id: tarifHonorairesId,
        statut_code: textOrCurrent(values.statut_code, originalDossier.statut_code),
        priorite: textOrCurrent(values.priorite, originalDossier.priorite),
        montant_principal_initial: numberOrCurrent(values.montant_principal_initial, originalDossier.montant_principal_initial),
        date_creance: dateOrNull(values.date_creance),
        date_prescription: dateOrNull(values.date_prescription),
        date_rappel: dateOrNull(values.date_rappel),
        motif_rappel: textOrNull(values.motif_rappel),
        type_interet: typeInteretSaisi,
        taux_interet: numberOrNull(values.taux_interet),
        categorie_taux_legal: textOrCurrent(values.categorie_taux_legal, "AUTRES"),
        date_depart_interets: dateOrNull(values.date_depart_interets),
        date_echeance_facture: echeanceFactureSaisie,
        med_envoyee: yesNoToBoolean(values.med_envoyee),
        date_mise_en_demeure: dateOrNull(values.date_mise_en_demeure),
        indemnite_40_euros: yesNoToBoolean(values.indemnite_40_euros),
        observations: textOrNull(values.observations)
    };

    const debiteurValues = {
        type_debiteur: typeDebiteurSaisi,
        siren: sirenSaisi,
        nom: textOrCurrent(values.nom, debiteur.nom),
        prenom: textOrNull(values.prenom),
        adresse: textOrNull(values.adresse),
        adresse_ligne_2: textOrNull(values.adresse_ligne_2),
        code_postal: textOrNull(values.code_postal),
        ville: textOrNull(values.ville),
        pays: textOrNull(values.pays),
        telephone_fixe: textOrNull(values.telephone_fixe),
        telephone_mobile: textOrNull(values.telephone_mobile),
        email: textOrNull(values.email),
        employeur: textOrNull(values.employeur),
        iban: normalizeIban(values.iban),
        bic: textOrNull(values.bic),
        mandat_sepa_reference: textOrNull(values.mandat_sepa_reference),
        mandat_sepa_date_signature: dateOrNull(values.mandat_sepa_date_signature)
    };

    const result = await updateDossierComplet({
        dossierId: originalDossier.id,
        debiteurId: debiteur.id,
        dossierValues,
        debiteurValues
    });

    if (result.error) {
        renderMessage(context.screen, "MODDOS", result.error);
        return;
    }

    const ancienStatutModdos = String(originalDossier.statut_code || "").toUpperCase();
    const nouveauStatutModdos = String(result.data?.statut_code || dossierValues.statut_code || "").toUpperCase();
    const detailModdos = ancienStatutModdos !== nouveauStatutModdos
        ? `DONNEES DOSSIER MISES A JOUR / ANCIEN STATUT : ${ancienStatutModdos || "-"} / NOUVEAU : ${nouveauStatutModdos || "-"}`
        : "DONNEES DOSSIER MISES A JOUR";
    await addHistorique({
        dossierId: originalDossier.id,
        typeEvenement: ancienStatutModdos !== nouveauStatutModdos ? "STATUT" : "MODDOS",
        libelle: ancienStatutModdos !== nouveauStatutModdos ? "MODIFICATION DOSSIER - CHANGEMENT DE STATUT" : "MODIFICATION DOSSIER",
        detail: detailModdos,
        utilisateurId: context.user?.id
    });

    await renderDossierAvecSituation(context, result.data);
}

async function renderDossierAvecSituation(context, dossier) {
    setContextDossier(context, dossier);

    const stats = await getDossierStats(dossier.id);
    const paiements = await getPaiementsByDossier(dossier.id);
    const situation = calculerSituationFinanciere(
        dossier,
        paiements.data || []
    );

    await renderDossierScreen(
        context.screen,
        dossier,
        stats,
        situation
    );
}

function setContextDossier(context, dossier) {
    if (typeof context.setCurrentDossier === "function") {
        context.setCurrentDossier(dossier);
    }
}

function setContextClient(context, client) {
    if (typeof context.setCurrentClient === "function") {
        context.setCurrentClient(client);
    }
}

function renderCallHelp(screen, dossier) {
    const debiteur = dossier.debiteurs || {};

    screen.innerHTML = `
        <section>
            <h2>CALL ${dossier.reference_dossier}</h2>
            <pre class="terminal-table">
DEBITEUR
NOM      : ${debiteur.nom || ""}
PRENOM   : ${debiteur.prenom || ""}
MOBILE   : ${debiteur.telephone_mobile || ""}
FIXE     : ${debiteur.telephone_fixe || ""}
EMAIL    : ${debiteur.email || ""}

RESULTATS APPEL
CALL J        DEBITEUR JOINT
CALL R        REPONDEUR
CALL I        INJOIGNABLE
CALL N        NUMERO INVALIDE
CALL P        PROMESSE DE PAIEMENT
CALL C        CONTESTATION
CALL REFUS    REFUS DE PAYER

PAIEMENT
PAY 150 VIREMENT REF123 COMMENTAIRE
PAYLIST

PROMESSE
PROM 150 30/06/2026 COMMENTAIRE
PROMLIST

RAPPEL
RAPPEL 05/06/2026 APPEL A REFAIRE
            </pre>
        </section>
    `;
}

function renderHistorique(screen, dossier, lignes) {
    const rows = lignes.map((ligne) => {
        const date = formatDateTime(ligne.date_evenement);
        const type = ligne.type_evenement || "";
        const libelle = ligne.libelle || "";
        const detail = ligne.detail || "";
        return `${date.padEnd(17)} ${type.padEnd(10)} ${libelle} ${detail}`;
    });

    screen.innerHTML = `
        <section>
            <h2>HISTORIQUE ${dossier.reference_dossier}</h2>
            <pre class="terminal-table">${rows.length ? rows.join("\n") : "AUCUNE LIGNE D'HISTORIQUE."}</pre>
        </section>
    `;
}

function renderTachesReelles(screen, dossiers, profile) {
    const todayLabel = formatDate(new Date().toISOString().split("T")[0]);

    const rows = dossiers.map((dossier) => {
        const debiteur = dossier.debiteurs || {};
        const nom = `${debiteur.nom || ""} ${debiteur.prenom || ""}`.trim();

        return `${String(dossier.reference_dossier || "").padEnd(12)} ${nom.padEnd(24)} ${formatDate(dossier.date_rappel).padEnd(12)} ${dossier.motif_rappel || ""}`;
    });

    screen.innerHTML = `
        <section>
            <h2>TACHES DU ${todayLabel}</h2>
            <p>UTILISATEUR : ${profile?.prenom || ""} ${profile?.nom || ""}</p>

            <pre class="terminal-table">
RAPPELS A EFFECTUER

${rows.length ? rows.join("\n") : "AUCUN RAPPEL A EFFECTUER."}

TOTAL : ${rows.length}
            </pre>
        </section>
    `;
}

function renderHelp(context, requestedPage = 1) {
    const pages = [
`NAVIGATION GENERALE
HELP          AIDE COMPLETE
MENU          MENU PRINCIPAL
CLS           EFFACER L'ECRAN
DASH          TABLEAU DE BORD DIRECTION
USER          UTILISATEUR CONNECTE
CTX           DOSSIER ACTIF
LOGOUT        DECONNEXION

DOSSIERS
DOS [REF]     OUVRIR UN DOSSIER
ADDOS         CREER UN DOSSIER
MODDOS        MODIFIER LE DOSSIER ACTIF
STATUT [ETAT] CHANGER RAPIDEMENT LE STATUT
NEXT          OUVRIR LE PROCHAIN DOSSIER A TRAITER
LST           LISTE DES DOSSIERS
LNEXT/LPREV   PAGES LISTE DOSSIERS
IMPORTDOS     IMPORTER DES DOSSIERS PAR CSV

CLIENTS / CREANCIERS
CLIENTS       LISTE DES CLIENTS
CLNEXT/CLPREV PAGES LISTE CLIENTS
CLI [REF]     FICHE CLIENT
CLIDOS [REF]  DOSSIERS D'UN CLIENT
CDNEXT/CDPREV PAGES DOSSIERS CLIENT
ADDCLI [SIRET] CREER CLIENT / PRE-REMPLIR SIRET
MODCLI [REF]  MODIFIER UN CLIENT
DELCLI [REF]  SUPPRIMER UN CLIENT

RELANCES / SUIVI DEBITEUR
CALL [CODE] [NOTE]  TRACER UN APPEL
NOTE [TEXTE]        AJOUTER UNE NOTE
RAPPEL              CREER UN RAPPEL
PROM                 CREER UNE PROMESSE DE PAIEMENT
PROMLIST             LISTE DES PROMESSES
PROMOK                MARQUER PROMESSE TENUE
PROMKO                MARQUER PROMESSE NON TENUE
PROMANNUL             ANNULER PROMESSE
SMS                   ENVOYER UN SMS AU DEBITEUR
CB [MONTANT]          LIEN CB MONTANT CONVENU + SMS
SMSTYPES              MODELES SMS
ADDSMS/MODSMS/DELSMS  GERER LES MODELES SMS
MAIL [CODE]           PREPARER / ENVOYER EMAIL DEBITEUR
MAILTYPES             MODELES EMAIL DEBITEUR
ADDMAIL/MODMAIL/DELMAIL GERER LES MODELES EMAIL
MAILCLI               EMAIL AU CLIENT / CREANCIER
MAILHUI               EMAIL A L'HUISSIER DU DOSSIER
MAILAVO               EMAIL A L'AVOCAT DU DOSSIER
COUR                  COURRIERS / MISE EN DEMEURE
FACTURE [N°]          RENSEIGNER N° DE FACTURE`,
`TACHES
TACHES         TACHES DU JOUR
TNEXT/TPREV    PAGES TACHES DU JOUR
TACHESFUT      TACHES FUTURES
TFNEXT/TFPREV  PAGES TACHES FUTURES
TACHESRETARD   TACHES EN RETARD
TRNEXT/TRPREV  PAGES TACHES EN RETARD

PAIEMENTS / ECHEANCIERS
PAY            SAISIR UN PAIEMENT
PAYLIST        LISTE DES PAIEMENTS DU DOSSIER
REVLIST        REVERSEMENTS A EFFECTUER (DETAIL)
REVCLI         REVERSEMENTS GROUPES PAR CLIENT
REVCLI [N] [REF] VALIDER VIREMENT CLIENT (AVANT LIMITE AUTORISE)
REV [N] [REF]  VALIDER REVERSEMENT UNITAIRE
REVHIS         HISTORIQUE REVERSEMENTS
MODPAY         MODIFIER UN PAIEMENT
DELPAY         SUPPRIMER UN PAIEMENT
IMPORTPAI      IMPORTER DES PAIEMENTS PAR CSV
RAPP           RAPPROCHER UN PAIEMENT CENTRALPAY
ECH            ECHEANCIER DU DOSSIER
ENEXT/EPREV    PAGES ECHEANCIER
ADDECH         CREER UN ECHEANCIER
MODECH         MODIFIER UN ECHEANCIER
ECHANNUL       ANNULER UN ECHEANCIER
ECHPAY         ENREGISTRER UNE ECHEANCE PAYEE

COMPTABILITE / FACTURATION
COMPTA         COMPTABILITE DU DOSSIER
REM            REMISE / DEGREVEMENT
REMLIST        LISTE DES REMISES
REMANNUL N     ANNULER UNE REMISE
CNEXT/CPREV    PAGES COMPTABILITE
INTDET         DETAIL DES INTERETS
INEXT/IPREV    PAGES DETAIL INTERETS
HON            HONORAIRES DU DOSSIER
HONNEXT/HONPREV PAGES HONORAIRES
FRAIS          FRAIS DU DOSSIER
FRNEXT/FRPREV  PAGES FRAIS
ADDFRAIS       AJOUTER DES FRAIS
MODFRAIS       MODIFIER DES FRAIS
DELFRAIS       SUPPRIMER DES FRAIS
FACTURES       CLIENTS A FACTURER
FACTNEXT/FACTPREV PAGES FACTURES
FACTCLI [REF]  DETAIL FACTURATION CLIENT
FCNEXT/FCPREV  PAGES FACTURATION CLIENT
FACTVAL        VALIDER LA FACTURATION ACTIVE
FACTMAIL       RENVOYER LA DERNIERE FACTURE QONTO PAR EMAIL
ECMENS MM AAAA ETAT DE COMPTE MENSUEL
ECNEXT/ECPREV  PAGES ETAT MENSUEL
ECFACT [CLIENT] [MM] [AAAA] ETAT DE COMPTE CLIENT
EFNEXT/EFPREV  PAGES ETAT CLIENT
ECFACTPDF      EXPORT PDF / IMPRESSION ETAT CLIENT`,
`TARIFS
TARIFS         LISTE DES TARIFS
TARNEXT/TARPREV PAGES TARIFS
ADDTAR         CREER UN TARIF
MODTAR [CODE]  MODIFIER UN TARIF
DELTAR [CODE]  DESACTIVER UN TARIF
TARPAL [CODE]  PALIERS D'UN TARIF
PALNEXT/PALPREV PAGES PALIERS
ADDPAL         AJOUTER UN PALIER
MODPAL         MODIFIER UN PALIER
DELPAL         SUPPRIMER UN PALIER

CONTENTIEUX / JUDICIAIRE
CONT           CONTENTIEUX DU DOSSIER ACTIF
ADDCONT        PASSER LE DOSSIER EN CONTENTIEUX
MODCONT        MODIFIER LE CONTENTIEUX
CONTIRR        CLASSER CONTENTIEUX IRRECOUVRABLE
CONTJUD        BASCULER EN JUDICIAIRE
JUD            SUIVI JUDICIAIRE DU DOSSIER
ADDJUD         CREER LE SUIVI JUDICIAIRE
MODJUD         MODIFIER LE SUIVI JUDICIAIRE

INTERVENANTS JUDICIAIRES
HUISSIERS      LISTE DES HUISSIERS
HUNEXT/HUPREV  PAGES HUISSIERS
HUI [REF]      FICHE HUISSIER
ADDHUI/MODHUI/DELHUI GERER LES HUISSIERS
TRIBUNAUX      LISTE DES TRIBUNAUX
TRIBNEXT/TRIBPREV PAGES TRIBUNAUX
TRIB [REF]     FICHE TRIBUNAL
ADDTRIB/MODTRIB/DELTRIB GERER LES TRIBUNAUX
AVOCATS        LISTE DES AVOCATS
AVONEXT/AVOPREV PAGES AVOCATS
AVO [REF]      FICHE AVOCAT
ADDAVO/MODAVO/DELAVO GERER LES AVOCATS

HISTORIQUE
HIS            HISTORIQUE DU DOSSIER
HNEXT/HPREV    PAGES HISTORIQUE
DELHIS         SUPPRIMER UNE LIGNE (ADMIN)

RACCOURCIS
F7             PAGE PRECEDENTE SI DISPONIBLE
F8             PAGE SUIVANTE SI DISPONIBLE
F10            VALIDER UN FORMULAIRE / ENVOI
ESC            ANNULER / QUITTER UN FORMULAIRE`
    ];

    const page = Math.min(Math.max(1, requestedPage), pages.length);
    context.setPage("help", page);
    context.setView("help");

    context.screen.innerHTML = `
        <section>
            <h2>HELP - COMMANDES POREC V2</h2>
            <pre class="terminal-table">${pages[page - 1]}

PAGE ${page}/${pages.length}   F7 = PRECEDENTE   F8 = SUIVANTE</pre>
        </section>
    `;
}

function renderMenu(context, requestedPage = 1) {
    const pages = [
`=== DOSSIERS ==================================================
DOS [REF]      OUVRIR DOSSIER          ADDOS       CREER DOSSIER
MODDOS         MODIFIER DOSSIER        FACTURE      N° FACTURE DOSSIER
STATUT         CHANGER STATUT
NEXT           PROCHAIN DOSSIER          GROUPE       VOIR GROUPE
GROUPER [REF]  GROUPER DOSSIERS          DEGROUPER    RETIRER DU GROUPE
LST            LISTE DOSSIERS          IMPORTDOS    IMPORT DOSSIERS CSV

=== CLIENTS / CREANCIERS =====================================
CLIENTS        LISTE CLIENTS           CLI [REF]    FICHE CLIENT
CLIDOS [REF]   DOSSIERS CLIENT         ADDCLI [SIRET] CREER CLIENT
MODCLI [REF]   MODIFIER CLIENT         DELCLI [REF] SUPPRIMER CLIENT

=== RELANCES / COMMUNICATION =================================
CALL           APPEL DEBITEUR          CALLA        VOCAL DOSSIER
CALLAG         VOCAL GROUPE             CALLAGVAL     VALIDER VOCAL GROUPE
CALLAGANNUL    ANNULER VOCAL GROUPE     NOTE         NOTE DOSSIER
RAPPEL         RAPPEL                  PROM         PROMESSE PAIEMENT
PROMLIST       LISTE PROMESSES         SMS          ENVOYER SMS
CB [MONTANT]  LIEN CB + SMS
SMSTYPES       MODELES SMS             MAIL [CODE]  EMAIL DEBITEUR
MAILTYPES      MODELES EMAIL           MAILCLI      EMAIL CLIENT
MAILHUI        EMAIL HUISSIER          MAILAVO      EMAIL AVOCAT
COUR           COURRIERS / MISE EN DEMEURE

=== TACHES ====================================================
TACHES         TACHES DU JOUR          TACHESRETARD TACHES EN RETARD
TACHESFUT      TACHES FUTURES`,
`=== PAIEMENTS / ECHEANCIERS ==================================
PAY            SAISIR PAIEMENT         PAYLIST      LISTE PAIEMENTS
MODPAY         MODIFIER PAIEMENT       DELPAY       SUPPRIMER PAIEMENT
IMPORTPAI      IMPORT PAIEMENTS CSV    ECH          ECHEANCIER
ADDECH         CREER ECHEANCIER        MODECH       MODIFIER ECHEANCIER
ECHANNUL       ANNULER ECHEANCIER      ECHPAY       PAYER ECHEANCE

=== COMPTABILITE / FACTURATION ===============================
COMPTA         COMPTABILITE DOSSIER    INTDET       DETAIL INTERETS
HON            HONORAIRES              FRAIS        FRAIS DOSSIER
ADDFRAIS       AJOUT FRAIS             MODFRAIS     MODIFIER FRAIS
DELFRAIS       SUPPRIMER FRAIS         FACTURES     CLIENTS A FACTURER
FACTCLI        FACTURATION CLIENT      FACTVAL      VALIDER FACTURATION
FACTMAIL       RENVOYER FACTURE QONTO
ECMENS         ETAT MENSUEL            ECFACT       ETAT COMPTE CLIENT
ECFACTPDF      EXPORT PDF ETAT CLIENT

=== TARIFS ====================================================
TARIFS         LISTE TARIFS            ADDTAR       CREER TARIF
MODTAR         MODIFIER TARIF          DELTAR       DESACTIVER TARIF
TARPAL         PALIERS TARIF           ADDPAL       AJOUTER PALIER
MODPAL         MODIFIER PALIER         DELPAL       SUPPRIMER PALIER`,
`=== CONTENTIEUX / JUDICIAIRE ================================
CONT           CONTENTIEUX DOSSIER     ADDCONT      CREER CONTENTIEUX
MODCONT        MODIFIER CONTENTIEUX    CONTIRR      IRRECOUVRABLE
CONTJUD        BASCULER JUDICIAIRE     JUD          SUIVI JUDICIAIRE
ADDJUD         CREER SUIVI JUD.        MODJUD       MODIFIER SUIVI JUD.

=== INTERVENANTS ==============================================
HUISSIERS      LISTE HUISSIERS         HUI [REF]    FICHE HUISSIER
ADDHUI         AJOUT HUISSIER          MODHUI       MODIFIER HUISSIER
DELHUI         SUPPRIMER HUISSIER      TRIBUNAUX    LISTE TRIBUNAUX
TRIB [REF]     FICHE TRIBUNAL          ADDTRIB      AJOUT TRIBUNAL
MODTRIB        MODIFIER TRIBUNAL       DELTRIB      SUPPRIMER TRIBUNAL
AVOCATS        LISTE AVOCATS           AVO [REF]    FICHE AVOCAT
ADDAVO         AJOUT AVOCAT            MODAVO       MODIFIER AVOCAT
DELAVO         SUPPRIMER AVOCAT

=== HISTORIQUE / SYSTEME =====================================
HIS            HISTORIQUE DOSSIER      DASH         TABLEAU DE BORD
USER           UTILISATEUR             CTX          DOSSIER ACTIF
HELP           AIDE COMPLETE           CLS          EFFACER ECRAN
LOGOUT         DECONNEXION`
    ];

    const page = Math.min(Math.max(1, requestedPage), pages.length);
    context.setPage("menu", page);
    context.setView("menu");

    context.screen.innerHTML = `
        <section>
            <h2>MENU GENERAL</h2>
            <pre class="terminal-table">${pages[page - 1]}

PAGE ${page}/${pages.length}   F7 = PRECEDENTE   F8 = SUIVANTE</pre>
        </section>
    `;
}

function renderUser(screen, profile, user) {
    screen.innerHTML = `
        <section>
            <h2>UTILISATEUR CONNECTE</h2>
            <pre class="terminal-table">
PRENOM : ${profile?.prenom || ""}
NOM    : ${profile?.nom || ""}
EMAIL  : ${profile?.email || user?.email || ""}
ROLE   : ${profile?.role || ""}
ACTIF  : ${profile?.actif ? "OUI" : "NON"}
            </pre>
        </section>
    `;
}

function renderContext(screen, currentDossier) {
    if (!currentDossier) {
        screen.innerHTML = `
            <section>
                <h2>CONTEXTE DOSSIER</h2>
                <pre class="terminal-table">
AUCUN DOSSIER ACTIF.

UTILISEZ :
DOS [REFERENCE]
OU
NEXT
                </pre>
            </section>
        `;
        return;
    }

    const debiteur = currentDossier.debiteurs || {};

    screen.innerHTML = `
        <section>
            <h2>CONTEXTE DOSSIER</h2>
            <pre class="terminal-table">
REFERENCE : ${currentDossier.reference_dossier || ""}
DEBITEUR  : ${(debiteur.nom || "") + " " + (debiteur.prenom || "")}
STATUT    : ${currentDossier.statut_code || ""}
PRINCIPAL : ${formatMoney(currentDossier.montant_principal_initial)}
RAPPEL    : ${formatDate(currentDossier.date_rappel)}
            </pre>
        </section>
    `;
}

function renderMessage(screen, title, message) {
    screen.innerHTML = `
        <section>
            <h2>${title}</h2>
            <p>${message}</p>
        </section>
    `;
}

function formatMoney(value) {
    return Number(value || 0).toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR"
    });
}

function formatDate(value) {
    if (!value) return "";

    const dateOnly = String(value).split("T")[0];

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
        const [annee, mois, jour] = dateOnly.split("-");
        return `${jour}/${mois}/${annee}`;
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        return value;
    }

    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";

    const jour = String(d.getDate()).padStart(2, "0");
    const mois = String(d.getMonth() + 1).padStart(2, "0");
    const annee = d.getFullYear();

    return `${jour}/${mois}/${annee}`;
}

function formatDateTime(value) {
    if (!value) return "";

    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";

    const jour = String(d.getDate()).padStart(2, "0");
    const mois = String(d.getMonth() + 1).padStart(2, "0");
    const annee = d.getFullYear();

    const heure = String(d.getHours()).padStart(2, "0");
    const minute = String(d.getMinutes()).padStart(2, "0");

    return `${jour}/${mois}/${annee} ${heure}:${minute}`;
}

function parseDateInput(value) {
    if (!value) return null;

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [jour, mois, annee] = value.split("/");
        return `${annee}-${mois}-${jour}`;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
    }

    return null;
}


function textOrNull(value) {
    const text = String(value ?? "").trim().toUpperCase();
    return text || null;
}

function textOrCurrent(value, current) {
    const text = String(value ?? "").trim().toUpperCase();
    return text || current || null;
}

function numberOrNull(value) {
    const text = String(value ?? "")
        .trim()
        .replace(/\s/g, "")
        .replace(/\u00A0/g, "")
        .replace(/\u202F/g, "")
        .replace(",", ".");

    if (!text) return null;

    const number = Number(text);
    return Number.isFinite(number) ? number : null;
}

function numberOrCurrent(value, current) {
    const number = numberOrNull(value);
    return number === null ? Number(current || 0) : number;
}

function dateOrNull(value) {
    const text = String(value ?? "").trim();
    if (!text) return null;
    return parseDateInput(text);
}

function yesNoToBoolean(value) {
    const text = String(value ?? "").trim().toUpperCase();
    return text === "O" || text === "OUI" || text === "TRUE" || text === "1";
}

function normalizeIban(value) {
    const text = String(value ?? "").replaceAll(" ", "").trim().toUpperCase();
    return text || null;
}

function normalizeSiren(value) {
    const digits = String(value ?? "").replace(/\D/g, "");
    if (!digits) return null;
    return /^\d{9}$/.test(digits) ? digits : null;
}

function formatNumberForInput(value) {
    return Number(value || 0).toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false
    });
}

async function handleLogout() {
    await signOut();
    window.location.reload();
}

async function handleTachesFuturesNext(context) {
    context.setPage("taches_futures", context.getPage("taches_futures") + 1);
    await handleTachesFutures(context);
}

async function handleTachesFuturesPrev(context) {
    context.setPage("taches_futures", Math.max(1, context.getPage("taches_futures") - 1));
    await handleTachesFutures(context);
}

async function handleTachesRetardNext(context) {
    context.setPage("taches_retard", context.getPage("taches_retard") + 1);
    await handleTachesRetard(context);
}

async function handleTachesRetardPrev(context) {
    context.setPage("taches_retard", Math.max(1, context.getPage("taches_retard") - 1));
    await handleTachesRetard(context);
}

async function handleTachesNext(context) {
    const nextPage = context.getPage("taches") + 1;

    context.setPage("taches", nextPage);

    await handleTaches(context);
}

async function handleTachesPrev(context) {
    const prevPage = Math.max(1, context.getPage("taches") - 1);

    context.setPage("taches", prevPage);

    await handleTaches(context);
}
