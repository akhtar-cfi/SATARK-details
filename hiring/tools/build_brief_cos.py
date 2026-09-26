# Two-page brief, variant for past Chief of Staff applicants:
# new dates, "who we're looking for" aligned to the LinkedIn post, a "Behind you" section.
SRC = "/tmp/claude-0/-home-user-SATARK-details/43dc5273-c493-511e-a551-faff6764e5b1/scratchpad/build_cfi_pdfs.py"
src = open(SRC).read()
exec(src.split("# ---------- 0. two-page brief")[0])

orig = src.split("def build_brief():")[1].split("# ---------- 1. one-pager")[0]
styles_block = orig.split("    F=[]")[0]                       # the P = {...} style dict
page2_block = orig.split("    # ---------------- PAGE 2 : ABOUT SATARK ----------------")[1].split("    buf=io.BytesIO()")[0]

PAGE1 = '''
    F=[]
    def add(st,t,b=None): F.append(Paragraph(inline(t),P[st],bulletText=b))

    # ---------------- PAGE 1 : THE ROLE ----------------
    add("h1","SATARK Pod Lead — Founding Role")
    add("sub","Crashfree India · A Cars24 Commitment · Gurugram, with travel across India · September 2026")

    add("h2","The role")
    add("body","Crashfree India is hiring one person to build and run SATARK's national expansion — and to run it "
               "like their own company. SATARK is our AI enforcement platform for traffic police, live today in "
               "Jaipur, Bengaluru and Gurugram; page 2 explains exactly how it works. The mandate: take it to the "
               "100 districts where India loses the most lives on its roads, by December 2027.")
    add("body","This is not a business-development role and not a policy desk. Nobody hands you a plan on Monday — "
               "the map of India is yours to draw.")

    add("h2","What you will actually do")
    add("bul","Own the 100-district goal end to end: which districts, in what order, signed how. Your pipeline, your targets.","–")
    add("bul","Sit across police commissioners, transport secretaries and state ministries. Convince them, sign the MoUs, and stay engaged until officers are actually intercepting vehicles.","–")
    add("bul","Drive each deployment with our engineering and installation teams — make every city live, and keep it live.","–")
    add("bul","Track the data: what's working, what's broken, and where we go next.","–")

    add("h2","Who we are looking for")
    add("bul","You have worked with government — district administrations, police, state departments — and know how a file moves.","–")
    add("bul","You have built or run something of your own — a startup, a campaign, an organisation. Failed ventures count.","–")
    add("bul","You are digitally native: at ease with data, dashboards and a product that runs on cameras and code.","–")
    add("bul","You are driven by impact, not titles. Officials can tell within minutes whether the person across the table cares about road deaths or is closing a sale. You have to be believed.","–")

    add("h2","Behind you")
    add("body","A small team of solid builders (one or two to start, growing with the districts), funding, Cars24's "
               "engineering and installation teams, and a direct line to Cars24 and Crashfree India leadership.")

    add("h2","How to apply")
    add("bul","**Reply** to Gajendra's email by **29 September, end of day** — one line is enough.","1.")
    add("bul","Send two things on the same thread (or to **Gajendra@crashfreeindia.org**) by **1 October, end of day**:","2.")
    add("sub2","Your latest CV — even if you shared one with an earlier application.","–")
    add("sub2","A 4–5 minute video (a link is fine): pick a problem you genuinely care about — anything this country looks away from — and convince us it matters. Back it with data; anticipate our questions. We are not testing polish. We are testing conviction.","–")
    add("bul","Shortlisted candidates have a conversation with the team and a short 48-hour assignment; final conversations are in Gurugram. Offers go out in October, for a mid-October start. Compensation is discussed in the first conversation.","3.")

    F.append(PageBreak())

    # ---------------- PAGE 2 : ABOUT SATARK ----------------'''

TAIL = '''
    buf=io.BytesIO()
    doc=BaseDocTemplate(buf, pagesize=letter, leftMargin=XL, rightMargin=W-XR, topMargin=H-TOP_Y+6, bottomMargin=46)
    frame=Frame(XL, 46, CW, TOP_Y-52, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="p", frames=[frame], onPage=lambda c,d: whiteout(c))])
    doc.build(F)
    buf.seek(0)
    merge_onto_template(buf, f"{OUTDIR}/SATARK_Pod_Lead_Brief_CoS.pdf")
'''
code = "def build_brief_cos():" + styles_block + PAGE1 + page2_block + TAIL
exec(code)
build_brief_cos()
