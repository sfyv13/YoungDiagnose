from openai import OpenAI

# Öz DeepSeek açarınızı bura yazın
DEEPSEEK_API_KEY = "sk-57cd0f6ab5d04726a6a4a92c53a7789c"
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

def ai_dan_sorus(kod):
    print(f"Bazada olmayan {kod} kodu üçün DeepSeek-ə müraciət edilir... Gözləyin...\n")
    
    # 1. MÜKƏMMƏL PROMPT BURADADIR
    prompt = f"""
    Sən peşəkar avtomobil diaqnostikası mütəxəssisisən. 
    Müştərinin avtomobilində '{kod}' xəta kodu çıxıb. 
    Bu xətanı araşdır və YALNIZ aşağıdakı JSON formatında cavab qaytar. 
    Qətiyyən salamlaşma, heç bir əlavə cümlə yazma və ```json kimi markdown işarələri istifadə etmə. Yalnız təmiz JSON ver:
    {{
        "xeta_kodu": "{kod}",
        "qisa_tesvir": "Xətanın 1 cümləlik qısa izahı",
        "mumkun_sebebler": ["Səbəb 1", "Səbəb 2"],
        "hell_addimlari": ["Addım 1", "Addım 2"]
    }}
    """
    
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            # Sistemə onun bir robot olduğunu və söhbət etməməli olduğunu deyirik
            {"role": "system", "content": "Sən yalnız JSON formatında məlumat qaytaran bir API serverisən. İnsan kimi danışmaq qadağandır."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3 # Bu rəqəm AI-ın "fantaziyasını" azaldır, onu daha dəqiq və ciddi edir
    )
    
    # Cavabı alıb kənarlarındakı boşluqları təmizləyirik
    təmiz_cavab = response.choices[0].message.content.strip()
    return təmiz_cavab

# Baza cədvəlinizdə (145 kodun içində) olmayan xəyali və ya nadir bir kodu test edirik
test_kodu = "P0999"
cavab = ai_dan_sorus(test_kodu)

print("--- DeepSeek-dən gələn cavab ---")
print(cavab)