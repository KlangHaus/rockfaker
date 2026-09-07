#!/usr/bin/env python3
"""Fejl hvis en osv-scanner-ignore mangler eller har en udløbet ignoreUntil.

Om osv-scanner selv haandhaever ignoreUntil er VERSIONSAFHAENGIGT
(v1.9.2: ja for udloebne · v2.0.0/v2.5.0: nej — begge maalt). Regn ALDRIG med det.
Og INGEN kendt version fejler paa en MANGLENDE ignoreUntil — en ignore uden dato
er permanent og tavs i alle versioner. DET er dette tjeks baerende funktion.
Se .orchestration/QUALITY-GATES.md for maalingerne.
eksterne tjek er enhver "midlertidig" accept i praksis permanent.

Distribueret af @klanghaus/quality-config. Kanonisk form: QUALITY-GATES.md.
Ret her + i noten samtidig.

Parser med tomllib, ikke regex: den tidligere regex-form fejlede i begge
retninger, og værst tavst — "[[ IgnoredVulns ]]" med whitespace er gyldig TOML
som splittet ikke matchede, så posten blev slet ikke tjekket og gaten meldte
grønt. En parser der kan narres af en kommentar kan ikke bære en
sikkerhedsaccept.
"""
import sys, tomllib, datetime

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
with open(sys.argv[1], "rb") as f:
    doc = tomllib.load(f)
entries = doc.get("IgnoredVulns", [])
now = datetime.datetime.now(datetime.timezone.utc)
bad = []
seen = 0
for n, e in enumerate(entries):
    vid = e.get("id")
    if not vid:
        bad.append(f"blok #{n}: MANGLER id")  # tæller IKKE med i seen
        continue
    u = e.get("ignoreUntil")
    if u is None:
        bad.append(f"{vid}: MANGLER ignoreUntil")
        continue
    # En ukvoteret dato i TOML bliver til et rent dato-objekt uden klokkeslæt,
    # en kvoteret bliver til tekst. Vi lægger midnat UTC på det rene dato-objekt,
    # så begge former kan sammenlignes.
    # (Prosa med vilje: Sonar S125 læste den tidligere kode-lignende form som
    # udkommenteret kode og gav en MAJOR — falsk positiv, men kommentaren er
    # bærende, så den omskrives frem for at blive undertrykt.)
    if isinstance(u, datetime.date) and not isinstance(u, datetime.datetime):
        u = datetime.datetime.combine(u, datetime.time.min)
    if isinstance(u, str):
        try:
            u = datetime.datetime.fromisoformat(u.replace("Z", "+00:00"))
        except ValueError:
            bad.append(f"{vid}: UGYLDIG dato {u!r}")
            continue
    if u.tzinfo is None:
        u = u.replace(tzinfo=datetime.timezone.utc)  # naiv = UTC
    seen += 1
    if u <= now:
        bad.append(f"{vid}: UDLØBET {u.isoformat()}")
if bad:
    for b in bad:
        print(f"::error::{b}")
    sys.exit(1)
print(f"OK — alle {seen} osv-ignores har en gyldig, ikke-udløbet ignoreUntil")
