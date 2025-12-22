from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# --- BAZANI OXUYAN HİSSƏ ---
def bazani_yukle():
    fayl_adi = 'xetalar.json'
    if not os.path.exists(fayl_adi):
        return None
    
    try:
        with open(fayl_adi, 'r', encoding='utf-8') as f:
            return json.load(f) # Siyahını olduğu kimi qaytarırıq
    except:
        return None

@app.route('/')
def home():
    return "YoungDiagnos Serveri İşləyir! (Yeni Baza)"

# --- AXTARIŞ SİSTEMİ (Marka -> Hissə -> Xəta) ---
@app.route('/api/xeta/<kod>', methods=['GET'])
def xeta_axtar(kod):
    butun_baza = bazani_yukle()
    
    if butun_baza is None:
        return jsonify({"error": "Baza faylı oxunmadı (JSON xətası)"}), 500

    axtarilan = kod.upper() # P0100

    # 1. Dövr: Markaları gəzirik (Volkswagen, Audi...)
    for marka_qrupu in butun_baza:
        marka_adi = marka_qrupu.get('marka', 'Naməlum')

        # 2. Dövr: Hissələri gəzirik (Mühərrik, Sürət qutusu...)
        for hisse_qrupu in marka_qrupu.get('hisseler', []):
            
            # 3. Dövr: Xətaları gəzirik
            for xeta in hisse_qrupu.get('xetalar', []):
                
                if xeta['kod'] == axtarilan:
                    # TAPDIQ! 
                    # Cavaba markanı da əlavə edək ki, istifadəçi bilsin
                    xeta['tapilan_marka'] = marka_adi
                    return jsonify(xeta), 200

    return jsonify({"error": "Bu kod bazada tapılmadı"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)