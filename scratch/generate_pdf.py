import os
from fpdf import FPDF

class ShowcasePDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 12)
        self.set_text_color(99, 102, 241) # Indigo accent
        self.cell(0, 10, 'InnovaFund AI - Showcase & Technical Presentation Guide', border=0, new_x="LMARGIN", new_y="NEXT", align='L')
        self.set_draw_color(200, 200, 200)
        self.line(10, 20, 200, 20)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}} | Enterprise AI Innovation Intelligence Platform', border=0, align='C')

def create_pdf(output_path):
    pdf = ShowcasePDF(orientation='P', unit='mm', format='A4')
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    
    # Document Title
    pdf.set_font('Helvetica', 'B', 18)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 10, 'InnovaFund AI Showcase & Presentation Guide', border=0, new_x="LMARGIN", new_y="NEXT", align='L')
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, 'Project: InnovaFund AI - AI-Powered Research Funding & Innovation Intelligence Platform', border=0, new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.ln(5)

    def section_title(title):
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(255, 255, 255)
        pdf.set_fill_color(99, 102, 241)
        pdf.cell(0, 8, f'  {title}', border=0, new_x="LMARGIN", new_y="NEXT", align='L', fill=True)
        pdf.ln(3)

    def sub_title(title):
        pdf.set_font('Helvetica', 'B', 10.5)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(0, 6, title, border=0, new_x="LMARGIN", new_y="NEXT", align='L')
        pdf.ln(1)

    def body_text(text):
        pdf.set_font('Helvetica', '', 9.5)
        pdf.set_text_color(51, 65, 85)
        pdf.multi_cell(0, 5, text)
        pdf.ln(2)

    def key_val(key, val):
        pdf.set_font('Helvetica', 'B', 9.5)
        pdf.set_text_color(30, 41, 59)
        pdf.write(5, f"  - {key}: ")
        pdf.set_font('Helvetica', '', 9.5)
        pdf.set_text_color(51, 65, 85)
        pdf.write(5, f"{val}\n")
        pdf.ln(1)

    # 1. Credentials
    section_title('1. DEFAULT PRE-SEEDED CREDENTIALS & LOGIN')
    key_val('Administrator Email', 'admin@researchsphere.ai')
    key_val('Administrator Password', 'Admin@123456')
    key_val('Pre-Seeded Role', 'Administrator (Access to Admin Console, Users Table, Audit Logs)')
    key_val('App Web URL', 'http://localhost:5173')
    key_val('Backend Swagger API Docs', 'http://localhost:8000/docs')
    pdf.ln(4)

    # 2. How to Register
    section_title('2. HOW TO REGISTER A NEW ACCOUNT (SIGN UP)')
    body_text('To demonstrate user registration and Role-Based Access Control (RBAC):')
    key_val('Step 1', 'Open http://localhost:5173/register or click "Get Started" on the Landing Page.')
    key_val('Step 2', 'Enter Full Name (e.g. Dr. Alex Rivera), Email (alex@university.edu), and Password.')
    key_val('Step 3', 'Click one of the 4 Role Selector Buttons: Researcher, Startup Founder, Innovation Manager, Administrator.')
    key_val('Step 4', 'Click "Register Account" -> Auto-creates account & profile, issues JWT token, redirects to Role Dashboard.')
    pdf.ln(4)

    # 3. Step-by-Step Showcase Script
    section_title('3. STEP-BY-STEP LIVE SHOWCASE SCRIPT (5-7 MINUTES)')
    
    sub_title('Step 1: Landing Page Overview (1 Min)')
    body_text('Show http://localhost:5173. Highlight the dark glassmorphism styling, live metric counters (250M+ Publications, 140M+ Patents, $15B+ Grants), and 4 Platform Innovation Pillars.')
    
    sub_title('Step 2: Admin Console & Dual-Database Audit Stream (1 Min)')
    body_text('Sign in as admin@researchsphere.ai / Admin@123456. Open Admin Console (/admin). Show User Accounts table, platform metrics, and switch to System Audit Logs tab showing live event tracking (USER_LOGIN, REGISTER, PROFILE_UPDATE).')

    sub_title('Step 3: Research Profile Management (1 Min)')
    body_text('Register a new Researcher account. Open Profile (/profile). Add professional title, Research Domains (Artificial Intelligence, Quantum Computing), and Technology Keywords (#deeplearning, #drugdiscovery). Click Save Changes and show live rendered tag pills.')

    sub_title('Step 4: Live Publication Dataset Integration (1.5 Mins)')
    body_text('Open Publications (/publications). Search query "artificial intelligence". Filter by source (OpenAlex, CrossRef, Semantic Scholar). Showcase live paper cards with title, authors, venue, year, citation count, and DOI external links.')

    sub_title('Step 5: Live Patent Intelligence Explorer (1 Min)')
    body_text('Open Patents (/patents). Search "quantum computing". Filter by source (USPTO, Google Patents, The Lens). Showcase patent numbers, assignees, and status badges (Granted / Pending).')
    pdf.ln(4)

    # 4. Architecture & Technical Explanations
    section_title('4. TECHNICAL ARCHITECTURE & TALKING POINTS')
    key_val('Hybrid Database Architecture', 'PostgreSQL 16 handles 11 relational tables (Users, Profiles, Pubs, Patents, Audit Logs) for strict ACID compliance; MongoDB 7 handles raw API payload caching.')
    key_val('Backend Clean Architecture', 'Built with FastAPI following 4-tier separation: Routers -> Services -> Repositories -> Models.')
    key_val('Security & RBAC', 'Bcrypt salted password hashing, JWT OAuth2 bearer security, and role enforcement guards (require_role).')
    key_val('Zero-Dependency Resilience', 'Automatic SQLite fallback allows the app to run locally with zero external database dependencies.')

    pdf.output(output_path)
    print(f"PDF successfully generated at: {output_path}")

if __name__ == '__main__':
    os.makedirs('docs', exist_ok=True)
    create_pdf('docs/InnovaFund_AI_Showcase_Guide.pdf')
    create_pdf('InnovaFund_AI_Showcase_Guide.pdf')
