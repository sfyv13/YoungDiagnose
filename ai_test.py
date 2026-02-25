from openai import OpenAI

# DeepSeek açarınızı bura yazın
DEEPSEEK_API_KEY = "sk-4106a7cbf793452b836c487331ffd7fe"
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

def ai_dan_sorus(kod):
    print(f"Bazada olmayan {kod} kodu üçün DeepSeek-ə müraciət edilir...\n")
    
    # Ən vacib hissə: AI-a verdiyimiz qəti əmr (Prompt)
    prompt = f"""
    Sən peşəkar avtomobil diaqnostikası mütəxəssisisən. 
    Avtomobildə {kod} xətası çıxıb. 
    Mənə yalnız və yalnız aşağıdakı JSON formatında cavab ver. 
    Qətiyyən salamlaşma, əlavə izah və ya markdown (```json) işarələri istifadə etmə. Yalnız təmiz JSON qaytar:
    {{
        "xeta_kodu": "{kod}",
        "qisa_tesvir": "...",
        "mumkun_sebebler": ["..."],
        "hell_addimlari": ["..."]
    }}
    """
    
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

# Bazanızda qətiyyən olmayan nadir bir kodu test edirik
yeni_kod = "P0999"
cavab = ai_dan_sorus(yeni_kod)

print("--- DeepSeek-dən gələn cavab ---")
print(cavab)