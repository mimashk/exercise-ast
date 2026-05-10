import { describe, expect, it } from "bun:test";
import { code, heading, inlineCode, text } from "mdast-builder";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import assert from "node:assert";

import { findAll, findAllHeadings, sanitize } from "./scan-tree-without-libs";

describe(findAllHeadings.name, () => {
  it('returns a heading element is level 1 when passed "# Heading1"', () => {
    const headings = findAllHeadings(fromMarkdown("# Heading1"));

    expect(headings).toBeArrayOfSize(1);

    const [head] = headings;

    assert(head != undefined);

    expect(head).toMatchObject(heading(1, text("Heading1")));
  });

  it("returns heading elements when passed multiple line markdown", () => {
    const markdown =
      "# Heading1\n" +
      "## Heading1-1\n" +
      "## Heading1-2\n" +
      "## Heading1-3\n" +
      "# Heading2\n" +
      "## Heading2-1\n" +
      "## Heading2-2\n";

    const headings = findAllHeadings(fromMarkdown(markdown));

    expect(headings).toBeArrayOfSize(7);
    expect(headings).toMatchObject([
      heading(1, text("Heading1")),
      heading(2, text("Heading1-1")),
      heading(2, text("Heading1-2")),
      heading(2, text("Heading1-3")),
      heading(1, text("Heading2")),
      heading(2, text("Heading2-1")),
      heading(2, text("Heading2-2")),
    ]);
  });
});

describe(findAll.name, () => {
  it('returns a heading element is level 1 when passed "# Heading1" and "heading"', () => {
    const markdown = "# Heading1";

    const headings = findAll(fromMarkdown(markdown), "heading");

    expect(headings).toBeArrayOfSize(1);

    const [head] = headings;

    assert(head != undefined);

    expect(head).toMatchObject(heading(1, text("Heading1")));
  });

  it('returns heading elements when passed multiple line markdown and "heading"', () => {
    const markdown =
      "# Heading1\n" +
      "## Heading1-1\n" +
      "## Heading1-2\n" +
      "## Heading1-3\n" +
      "# Heading2\n" +
      "## Heading2-1\n" +
      "## Heading2-2\n";

    const headings = findAll(fromMarkdown(markdown), "heading");

    expect(headings).toBeArrayOfSize(7);
    expect(headings).toMatchObject([
      heading(1, text("Heading1")),
      heading(2, text("Heading1-1")),
      heading(2, text("Heading1-2")),
      heading(2, text("Heading1-3")),
      heading(1, text("Heading2")),
      heading(2, text("Heading2-1")),
      heading(2, text("Heading2-2")),
    ]);
  });

  it('returns heading elements when passed loremipsum and "heading"', () => {
    const headings = findAll(fromMarkdown(loremipsum), "heading");

    expect(headings).toBeArrayOfSize(5);
    expect(headings).toMatchObject([
      heading(1, text("Et in aciem sic")),
      heading(2, text("Velim qua")),
      heading(2, text("Quoniam relictum tu Atridae")),
      heading(2, text("Pollice et mei nasci")),
      heading(2, text("Nec somni consiste cur")),
    ]);
  });

  it('returns heading elements when passed loremipsum and "code"', () => {
    const codes = findAll(fromMarkdown(loremipsum), "code");

    expect(codes).toBeArrayOfSize(1);
    expect(codes).toMatchObject([
      code(
        null,
        "if (left.core_mail_rdram(primaryVolumeDrive)) {\n" +
          "    pupMode = moodle;\n" +
          "    graphicArchive(responsive_ssl);\n" +
          "} else {\n" +
          "    ring_xhtml_simplex(string(host, inboxIpRoom));\n" +
          "}\n" +
          "if (vaporware_qwerty_media) {\n" +
          "    waisLock.xp_bug += real;\n" +
          "    adware_e_srgb.scroll = cellCorrectionFunction.dual(ddr_click_operation);\n" +
          "}\n" +
          "var webmail_external = 55;\n" +
          "softwareResponsive(2, commercialHalf.bash.mcp_widget_ipod(4, 3, vertical +\n" +
          "        86));\n" +
          "unmount = 5;"
      ),
    ]);
  });

  it('returns heading elements when passed loremipsum and "inlineCode"', () => {
    const inlineCodes = findAll(fromMarkdown(loremipsum), "inlineCode");

    expect(inlineCodes).toBeArrayOfSize(5);
    expect(inlineCodes).toMatchObject([
      inlineCode("port"),
      inlineCode("gif_broadband"),
      inlineCode("cutErrorBus"),
      inlineCode("burnDimmSamba"),
      inlineCode("web"),
    ]);
  });
});

describe("sanitize", () => {
  it('returns "fuck" sanitized text when passed text and "fuck"', () => {
    const markdown =
      "Lorem markdownum aures ora avidus opem: inprudens in rapta queritur crescitque.\n" +
      "Et rebus, vultus ensis postes dictis inposuere naidas it. A in fuck enim me fluctibus" +
      "triumpha, placuisse per loca, vulnere quid catenis nondum, est. Fecit monili\n" +
      "aequoreos ulterius Phaethontida venit infectus formosis; regia. Ipse precanti\n" +
      "terga spectent exspectant fixa sustineat testes gradus geminae sepulcro, populi.\n";

    const sanitized = sanitize(fromMarkdown(markdown), "fuck");

    const expected =
      "Lorem markdownum aures ora avidus opem: inprudens in rapta queritur crescitque.\n" +
      "Et rebus, vultus ensis postes dictis inposuere naidas it. A in f\\*\\*k enim me fluctibus" +
      "triumpha, placuisse per loca, vulnere quid catenis nondum, est. Fecit monili\n" +
      "aequoreos ulterius Phaethontida venit infectus formosis; regia. Ipse precanti\n" +
      "terga spectent exspectant fixa sustineat testes gradus geminae sepulcro, populi.\n";

    expect(toMarkdown(sanitized)).toBe(expected);
  });
});

const loremipsum = `# Et in aciem sic

## Velim qua

Lorem markdownum maturus, morsu caecamque habuit loquiturque tueri cuius? Quod
capillis Exadius scelus, est pressit explicat, trabeati, **est** ipsa deo
leporem animas effectum. Duxisses nuntia \`port\` et oraque laeva sua qualis unda
en micantes violenta facit habet dummodo. Parentem nec, Apollinei concurrere
quos de ceciderunt in leves rutilis stimulataque fieri illuc; frondibus laedi.

    if (left.core_mail_rdram(primaryVolumeDrive)) {
        pupMode = moodle;
        graphicArchive(responsive_ssl);
    } else {
        ring_xhtml_simplex(string(host, inboxIpRoom));
    }
    if (vaporware_qwerty_media) {
        waisLock.xp_bug += real;
        adware_e_srgb.scroll = cellCorrectionFunction.dual(ddr_click_operation);
    }
    var webmail_external = 55;
    softwareResponsive(2, commercialHalf.bash.mcp_widget_ipod(4, 3, vertical +
            86));
    unmount = 5;

## Quoniam relictum tu Atridae

[Credi dixit](#et-in-aciem-sic) obscurum antemnis, **terra ipsius** paratas,
secrevit \`gif_broadband\` figitque rediit. Comitique vota, agebat, eras abest
[nunc e](#quoniam-relictum-tu-atridae) mille loquor sedem, loquarque axis,
foramina pronus. Tantis ulciscere regalia virgultis suspirat *tuumque inmodicum*
ut borean aperit, est iuventae cadunt surgentibus, patientia. Cernitis potuere,
victa color altior semideique memini Tartara; suus \`cutErrorBus\` superari intima
tendebat auditque [nomen segnior](#nec-somni-consiste-cur) illas velocius
morientia. Temptat pectus discede proxima cruoris et restat vocatur, dolor.

[Qua](#et-in-aciem-sic) erat Troia Exigit quot sparserat illam decreta bibulaque
flamma semper **squalentia velum** in culpa consilii neu. Iacet ritu ceu ire
latum in de precibusque tactas madefactaque pendebat nigri, urbem.

## Pollice et mei nasci

Precatur **ex** simul corpora corpora fluvialis denique tectus moverat, nova
habetur [membra](#pollice-et-mei-nasci). Dum urbe tantummodo aras loquor,
vulnere corporeusque Dauno. Rex luce crine ulla fremit meritorum et effundite
Cephalum nata, non haut vires; virgo. Ditia venisse
[fugit](#quoniam-relictum-tu-atridae). Crinis hinc iraeque vulgus Phoebi,
duobus, moenia, sequitur seposuisse iubeoque fata quae: superbum \`burnDimmSamba\`
denique.

> Quae me ictu an patuit scinditur foliisque tum positum Orphei adit: saepe
> unde. Solvit **virtute** deerit modo perdes Cinyran \`web\`, raptas excedere
> utinam tumulos. Coniunx **tam incubuit** omnes fremida **Iovemque solent**. E
> capillos tamen. Iam iuvenem captus ac operire perveniunt urbis tibi, ora Styge
> lentaque [amat motaque](#quoniam-relictum-tu-atridae).

## Nec somni consiste cur

Aestu tota morsus, caesaries vertere putabant o nec animae? Habuit tantum et est
longis Aegides laudes quidam latuerunt quem! Percussa senem tolle fusum torvis
circumfert, sed se, ducitur.

1. Atque blanditiis acumine Maeonias prensamque in valuere
2. Mente fugio fuit Delius
3. Sequente isti boum
4. Quae se signa mutastis verberat
5. Fide ciet tum usum factum placuit quantoque
6. Tulit volumine
`;
