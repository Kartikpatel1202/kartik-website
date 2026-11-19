import type { CodeExcerpt } from "@/types/content";

/**
 * Verbatim source excerpts, pinned to the commit they were copied from (2026-11-15), so each
 * permalink keeps pointing at exactly these lines.
 */
export const razorShieldJwt: CodeExcerpt = {
  file: "backend/app/core/security.py",
  startLine: 148,
  href: "https://github.com/Kartikpatel1202/RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform/blob/b3ae9f10df45dcdc77d2155bffe9902ef3b21b5c/backend/app/core/security.py#L148-L163",
  caption:
    "Token verification accepts exactly one algorithm, which closes off “alg: none” and HS/RS confusion.",
  code: [
    "    settings = settings or get_settings()",
    "    try:",
    "        payload = jwt.decode(",
    "            token,",
    "            settings.jwt_secret,",
    "            # A list of exactly one algorithm. PyJWT will not consider any",
    "            # other, which is what closes off `alg: none` and HS/RS confusion.",
    "            algorithms=[settings.jwt_algorithm],",
    "            issuer=settings.jwt_issuer,",
    "            audience=settings.jwt_audience,",
    '            options={"require": ["exp", "iat", "sub", "iss", "aud"]},',
    "        )",
    "    except jwt.ExpiredSignatureError as exc:",
    '        raise TokenError("token expired") from exc',
    "    except jwt.InvalidTokenError as exc:",
    '        raise TokenError("token invalid") from exc',
  ].join("\n"),
};

export const taskPilotGuard: CodeExcerpt = {
  file: "backend/app/browser/navigation_guard.py",
  startLine: 49,
  href: "https://github.com/Kartikpatel1202/TaskPilot-AI/blob/25c2bbd0911eee2e3005a0f538b4b06f2f059300/backend/app/browser/navigation_guard.py#L49-L62",
  caption:
    "The navigation guard only allows exact allow-listed domains and hosts that resolve to public IP addresses.",
  code: [
    "def domain_allowed(host: str, allowed: list[str]) -> bool:",
    '    """Exact domain or a real subdomain of it. `blinkit.com.evil.example` never matches."""',
    '    host = host.lower().rstrip(".")',
    '    return any(host == d or host.endswith("." + d) for d in allowed)',
    "",
    "",
    "def is_public_ip(value: str) -> bool:",
    "    try:",
    "        ip = ipaddress.ip_address(value)",
    "    except ValueError:",
    "        return False",
    "    if isinstance(ip, ipaddress.IPv6Address) and ip.ipv4_mapped is not None:",
    "        ip = ip.ipv4_mapped",
    "    return ip.is_global and not ip.is_multicast",
  ].join("\n"),
};

export const airtelSyncGuard: CodeExcerpt = {
  file: "services/api/app/advisor/guard.py",
  startLine: 39,
  href: "https://github.com/Kartikpatel1202/Airtel-Sync/blob/6030365e87c18126f04d464a6b74d74eec532ce6/services/api/app/advisor/guard.py#L39-L52",
  caption:
    "The output guard flags any rupee amount or product ID in the advisor’s reply that no tool returned.",
  code: [
    "def check(reply: str, allowed_numbers: set[int], allowed_pids: set[str]) -> list[str]:",
    "    problems = []",
    "    text = reply.translate(_DEV)",
    "    for m in _MONEY.finditer(text):",
    '        raw = (m.group(1) or m.group(2) or "").replace(",", "")',
    "        if not raw:",
    "            continue",
    "        v = int(round(float(raw)))",
    "        if v not in allowed_numbers:",
    '            problems.append(f"amount ₹{raw} does not come from a tool result")',
    "    for m in _PID.finditer(text):",
    '        if "P" + m.group(1) not in allowed_pids:',
    '            problems.append(f"product P{m.group(1)} was not returned by a tool")',
    "    return problems",
  ].join("\n"),
};

export const agenticCanary: CodeExcerpt = {
  file: "app/security/egress/canary.py",
  startLine: 91,
  href: "https://github.com/Kartikpatel1202/AgenticAiSafety/blob/4bc0c2233e7b1645b24e45f4dfab2f60cf8236b0/app/security/egress/canary.py#L91-L106",
  caption:
    "Canary tokens prove a system-prompt leak deterministically; only their identifiers are ever logged.",
  code: [
    "    def find_leaked(self, text: str, session_id: str | None = None) -> list[str]:",
    '        """Return identifiers of canaries present in ``text``.',
    "",
    "        Scans every known token, not only this session's: a canary from another",
    "        session appearing here would indicate cross-session contamination,",
    "        which is worth catching even though it should be impossible.",
    "",
    "        Returns identifiers, never values.",
    '        """',
    "        if not text:",
    "            return []",
    "        leaked: list[str] = []",
    "        for sid, token in self._by_session.items():",
    "            if token in text:",
    "                leaked.append(self.identifier_for(token))",
    "        return leaked",
  ].join("\n"),
};
