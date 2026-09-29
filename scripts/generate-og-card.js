const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgCard() {
  const width = 1200;
  const height = 630;

  // 1. Process Caregiver & Senior Photo (Right side)
  const photoW = 440;
  const photoH = 390;
  const rawPhoto = await sharp('public/images/caregiver-client-warm.png')
    .resize(photoW, photoH, { fit: 'cover', position: 'top' })
    .toBuffer();

  const maskSvg = `<svg width="${photoW}" height="${photoH}">
    <rect x="0" y="0" width="${photoW}" height="${photoH}" rx="22" ry="22" fill="#fff"/>
  </svg>`;

  const roundedPhoto = await sharp(rawPhoto)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Process Logo
  const logoBuf = await sharp('public/images/pavan-logo/PavanHomecare_Transparent.png')
    .resize(225, null, { fit: 'inside' })
    .png()
    .toBuffer();

  // Base64 encode for embedding in SVG
  const photoBase64 = `data:image/png;base64,${roundedPhoto.toString('base64')}`;
  const logoBase64 = `data:image/png;base64,${logoBuf.toString('base64')}`;

  // 3. Compose Complete Card via SVG for razor-sharp typography
  const svgCard = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="topLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0061FF"/>
        <stop offset="50%" stop-color="#60EFFF"/>
        <stop offset="100%" stop-color="#FF7A59"/>
      </linearGradient>

      <linearGradient id="coralBtn" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF7A59"/>
        <stop offset="100%" stop-color="#E85D3B"/>
      </linearGradient>

      <linearGradient id="blueAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0061FF"/>
        <stop offset="100%" stop-color="#0047B8"/>
      </linearGradient>

      <filter id="photoShadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#001A4D" flood-opacity="0.14"/>
      </filter>

      <style>
        .font-poppins {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
      </style>
    </defs>

    <!-- Background Card -->
    <rect width="${width}" height="${height}" fill="#FFFFFF"/>
    
    <!-- Top 5px Brand Gradient Strip -->
    <rect x="0" y="0" width="${width}" height="5" fill="url(#topLine)"/>

    <!-- Subtle Outer Border Frame -->
    <rect x="1.5" y="1.5" width="1197" height="627" fill="none" stroke="#E2E8F0" stroke-width="2" rx="4"/>

    <!-- =================================================================== -->
    <!-- LEFT COLUMN: BRAND & MARKETING COPY                                 -->
    <!-- =================================================================== -->

    <!-- 1. Logo (Embedded PNG) -->
    <image href="${logoBase64}" x="48" y="24" width="220" height="72"/>

    <!-- 2. Location Chip -->
    <g transform="translate(290, 42)">
      <rect x="0" y="0" width="375" height="32" rx="16" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.2"/>
      <!-- Map Pin SVG Icon -->
      <path d="M14 10a4 4 0 0 1 4 4c0 3-4 7-4 7s-4-4-4-7a4 4 0 0 1 4-4z" fill="#0061FF"/>
      <circle cx="14" cy="14" r="1.5" fill="#FFFFFF"/>
      <text x="26" y="21" class="font-poppins" font-size="12" font-weight="700" fill="#0047B8" letter-spacing="0.2">
        Serving Bucks County, Philadelphia &amp; 9 PA Counties
      </text>
    </g>

    <!-- 3. Primary Headline (Requested by User) -->
    <!-- "In-Home Senior Care & Caregiver Services in Bucks County, Pennsylvania" -->
    <text x="50" y="132" class="font-poppins" font-size="28.5" font-weight="800" fill="#001A4D" letter-spacing="-0.5">
      In-Home Senior Care &amp; Caregiver Services
    </text>
    <text x="50" y="172" class="font-poppins" font-size="30" font-weight="800" fill="#0061FF" letter-spacing="-0.5">
      In Bucks County, Pennsylvania
    </text>

    <!-- 4. Subtitle -->
    <text x="50" y="206" class="font-poppins" font-size="14.5" font-weight="500" fill="#4B5563">
      Compassionate In-Home Senior Care &amp; Personal Assistance • Love Driven Care
    </text>

    <!-- 5. Six Pill Service Badges (2x3 Grid) -->
    <!-- Row 1 -->
    <g transform="translate(50, 226)">
      <rect x="0" y="0" width="280" height="36" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2"/>
      <text x="14" y="23" font-size="15" fill="#FF7A59">♥</text>
      <text x="34" y="23" class="font-poppins" font-size="12.5" font-weight="700" fill="#0F172A">Personal Care &amp; Hygiene</text>
    </g>

    <g transform="translate(345, 226)">
      <rect x="0" y="0" width="280" height="36" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2"/>
      <text x="14" y="23" font-size="15" fill="#FF7A59">♥</text>
      <text x="34" y="23" class="font-poppins" font-size="12.5" font-weight="700" fill="#0F172A">Companion Care &amp; Errands</text>
    </g>

    <!-- Row 2 -->
    <g transform="translate(50, 272)">
      <rect x="0" y="0" width="280" height="36" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2"/>
      <text x="14" y="23" font-size="15" fill="#FF7A59">♥</text>
      <text x="34" y="23" class="font-poppins" font-size="12.5" font-weight="700" fill="#0F172A">24-Hour &amp; Live-In Care</text>
    </g>

    <g transform="translate(345, 272)">
      <rect x="0" y="0" width="280" height="36" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2"/>
      <text x="14" y="23" font-size="15" fill="#FF7A59">♥</text>
      <text x="34" y="23" class="font-poppins" font-size="12.5" font-weight="700" fill="#0F172A">Dementia &amp; Memory Care</text>
    </g>

    <!-- Row 3 -->
    <g transform="translate(50, 318)">
      <rect x="0" y="0" width="280" height="36" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2"/>
      <text x="14" y="23" font-size="15" fill="#FF7A59">♥</text>
      <text x="34" y="23" class="font-poppins" font-size="12.5" font-weight="700" fill="#0F172A">Respite &amp; Post-Hospital Care</text>
    </g>

    <g transform="translate(345, 318)">
      <rect x="0" y="0" width="280" height="36" rx="10" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.2"/>
      <text x="14" y="23" font-size="15" fill="#0061FF">★</text>
      <text x="34" y="23" class="font-poppins" font-size="12.5" font-weight="700" fill="#0047B8">Medicaid Waiver (CHC) Pay</text>
    </g>

    <!-- 6. Trust Checklist -->
    <g transform="translate(50, 375)">
      <text x="0" y="16" font-size="15" font-weight="bold" fill="#059669">✓</text>
      <text x="18" y="15" class="font-poppins" font-size="13" font-weight="700" fill="#001A4D">Free In-Home Assessment</text>

      <text x="210" y="16" font-size="15" font-weight="bold" fill="#059669">✓</text>
      <text x="228" y="15" class="font-poppins" font-size="13" font-weight="700" fill="#001A4D">Vetted &amp; Screened Caregivers</text>

      <text x="440" y="16" font-size="15" font-weight="bold" fill="#059669">✓</text>
      <text x="458" y="15" class="font-poppins" font-size="13" font-weight="700" fill="#001A4D">24/7 Live Support</text>
    </g>

    <!-- 7. Separator Line -->
    <line x1="50" y1="408" x2="625" y2="408" stroke="#E2E8F0" stroke-width="1"/>

    <!-- 8. Key Highlights Grid -->
    <g transform="translate(50, 422)">
      <g>
        <text x="0" y="16" class="font-poppins" font-size="12" font-weight="800" fill="#0061FF">LICENSED AGENCY</text>
        <text x="0" y="32" class="font-poppins" font-size="11.5" font-weight="500" fill="#64748B">PA Dept. of Health</text>
      </g>
      <g transform="translate(195, 0)">
        <text x="0" y="16" class="font-poppins" font-size="12" font-weight="800" fill="#0061FF">COMMUNITY HEALTHCHOICES</text>
        <text x="0" y="32" class="font-poppins" font-size="11.5" font-weight="500" fill="#64748B">Approved PA Waiver Provider</text>
      </g>
      <g transform="translate(425, 0)">
        <text x="0" y="16" class="font-poppins" font-size="12" font-weight="800" fill="#0061FF">FAST PLACEMENT</text>
        <text x="0" y="32" class="font-poppins" font-size="11.5" font-weight="500" fill="#64748B">Care within 24-48 hours</text>
      </g>
    </g>

    <!-- =================================================================== -->
    <!-- RIGHT COLUMN: CAREGIVER PHOTO CARD & ACCREDITATIONS                -->
    <!-- =================================================================== -->

    <!-- Top Accreditation Badge -->
    <g transform="translate(710, 36)">
      <rect x="0" y="0" width="440" height="34" rx="10" fill="#F0FDF4" stroke="#BBF7D0" stroke-width="1.2"/>
      <text x="16" y="22" font-size="14" font-weight="bold" fill="#16A34A">✓</text>
      <text x="36" y="21" class="font-poppins" font-size="12" font-weight="700" fill="#15803D" letter-spacing="0.2">
        PA Dept. of Health Licensed • Medicaid Waiver Provider
      </text>
    </g>

    <!-- Photo Container Frame with subtle drop shadow -->
    <g transform="translate(710, 80)" filter="url(#photoShadow)">
      <!-- Border outline -->
      <rect x="-2" y="-2" width="${photoW + 4}" height="${photoH + 4}" rx="24" fill="none" stroke="#0061FF" stroke-width="2.5" opacity="0.35"/>
      <!-- The Photo -->
      <image href="${photoBase64}" x="0" y="0" width="${photoW}" height="${photoH}"/>
      
      <!-- Star Rating Badge Overlaid on Bottom of Photo -->
      <g transform="translate(20, ${photoH - 52})">
        <rect x="0" y="0" width="400" height="42" rx="12" fill="rgba(255, 255, 255, 0.96)" stroke="#E2E8F0" stroke-width="1.2"/>
        <text x="16" y="26" font-size="15" fill="#F59E0B">★★★★★</text>
        <text x="96" y="26" class="font-poppins" font-size="12.5" font-weight="800" fill="#001A4D">
          Trusted Senior Care
        </text>
        <text x="238" y="26" class="font-poppins" font-size="11.5" font-weight="600" fill="#64748B">
          • Compassion &amp; Dignity
        </text>
      </g>
    </g>

    <!-- =================================================================== -->
    <!-- BOTTOM FOOTER ACTION BAR                                            -->
    <!-- =================================================================== -->
    <g transform="translate(50, 520)">
      <!-- Outer rounded container -->
      <rect x="0" y="0" width="1100" height="74" rx="18" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>

      <!-- Coral CTA Call Pill -->
      <g transform="translate(14, 12)">
        <rect x="0" y="0" width="375" height="50" rx="25" fill="url(#coralBtn)"/>
        <!-- Phone SVG Icon Circle -->
        <circle cx="28" cy="25" r="16" fill="rgba(255, 255, 255, 0.22)"/>
        <!-- White Phone SVG path -->
        <g transform="translate(20, 17)">
          <path d="M12.5 9.5v1.7a1.2 1.2 0 0 1-1.3 1.2A11.2 11.2 0 0 1 6.3 10.7a11.1 11.1 0 0 1-3.4-3.4 11.2 11.2 0 0 1-1.7-4.9A1.2 1.2 0 0 1 2.4 1.2h1.7a1.2 1.2 0 0 1 1.2 1 7.3 7.3 0 0 0 .4 1.6 1.2 1.2 0 0 1-.3 1.2l-.7.7a9 9 0 0 0 3.4 3.4l.7-.7a1.2 1.2 0 0 1 1.2-.3 7.3 7.3 0 0 0 1.6.4 1.2 1.2 0 0 1 1 1.2z" fill="#FFFFFF"/>
        </g>
        <text x="54" y="24" class="font-poppins" font-size="10" font-weight="700" fill="rgba(255,255,255,0.92)" letter-spacing="0.5">
          FREE IN-HOME CONSULTATION
        </text>
        <text x="54" y="42" class="font-poppins" font-size="17" font-weight="800" fill="#FFFFFF">
          (215) 436-9499
        </text>
      </g>

      <!-- Center County Coverage -->
      <g transform="translate(415, 26)">
        <text x="0" y="13" class="font-poppins" font-size="12.5" font-weight="700" fill="#001A4D">
          Bucks • Philadelphia • Montgomery • Delaware • Chester • Lehigh
        </text>
        <text x="0" y="31" class="font-poppins" font-size="11" font-weight="500" fill="#64748B">
          Dedicated 24/7 Live Care Coordinators Across Eastern Pennsylvania
        </text>
      </g>

      <!-- Right Domain & Agency Badge -->
      <g transform="translate(860, 22)">
        <text x="220" y="16" class="font-poppins" font-size="17" font-weight="800" fill="#0061FF" text-anchor="end">
          pavanhomecare.com
        </text>
        <text x="220" y="34" class="font-poppins" font-size="10.5" font-weight="700" fill="#059669" text-anchor="end" letter-spacing="0.3">
          PA DEPT. OF HEALTH LICENSED
        </text>
      </g>
    </g>
  </svg>
  `;

  // 4. Render to buffer using Sharp and optimize for ultra-fast mobile loading
  const svgBuffer = Buffer.from(svgCard);
  
  const finalJpegBuffer = await sharp(svgBuffer)
    .jpeg({
      quality: 89,
      chromaSubsampling: '4:4:4',
      progressive: false, // Baseline JPEG loads immediately without progressive delay
    })
    .toBuffer();

  // Save to public/images/og-image.jpg
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-image.jpg');
  fs.writeFileSync(outputPath, finalJpegBuffer);

  const stats = fs.statSync(outputPath);
  console.log(`Success! Generated ultra-modern og-image.jpg at ${outputPath}`);
  console.log(`Dimensions: ${width}x${height}, Size: ${(stats.size / 1024).toFixed(1)} KB`);
}

createOgCard().catch(err => {
  console.error('Error generating card:', err);
  process.exit(1);
});
