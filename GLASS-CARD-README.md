# 🎨 Glass Card System

Merkezi, yeniden kullanılabilir glassmorphism kart sistemi.

## 🚀 Hızlı Başlangıç

### 1. Temel Kullanım
```html
<div class="glass-card">
    <!-- İçerik -->
</div>
```

### 2. Modal Kartı
```html
<div class="glass-card glass-card--modal">
    <h2>Başlık</h2>
    <p>İçerik</p>
</div>
```

### 3. Küçük Kart
```html
<div class="glass-card glass-card--sm">
    <p>Küçük içerik</p>
</div>
```

### 4. Büyük Kart
```html
<div class="glass-card glass-card--lg">
    <h2>Geniş içerik alanı</h2>
</div>
```

### 5. Statik Kart (Hover Yok)
```html
<div class="glass-card glass-card--static">
    <p>Hover efekti olmayan içerik</p>
</div>
```

## 📦 Varyantlar

| Sınıf | Kullanım | Boyut | Padding |
|-------|----------|-------|---------|
| `.glass-card` | Temel kart | Özel | Özel |
| `.glass-card--modal` | Modal pencereler | max-w: 28rem | 2rem |
| `.glass-card--sm` | Küçük kartlar | max-w: 20rem | 1.5rem |
| `.glass-card--lg` | Büyük kartlar | max-w: 48rem | 3rem |
| `.glass-card--static` | Hover yok | - | - |

## 🎨 Özelleştirme

### CSS Variables
```css
:root {
    --glass-bg: rgba(255, 255, 255, 0.3);
    --glass-border: rgba(255, 255, 255, 0.2);
    --glass-shadow: rgba(31, 38, 135, 0.2);
    --glass-blur: 32px;
}
```

### Inline Özelleştirme
```html
<div class="glass-card" style="--glass-bg: rgba(255, 255, 255, 0.5);">
    <!-- Daha opak arka plan -->
</div>
```

## 📁 Dosyalar

- `index.html` - Ana sayfa (güncellenmiş)
- `authRegister.html` - Auth sayfası (güncellenmiş)
- `glass-card-examples.html` - Canlı örnekler
- `GLASSMORPHISM-REFACTOR.md` - Detaylı dokümantasyon

## ✅ Avantajlar

- ✅ Kod tekrarı %97 azaldı
- ✅ Merkezi yönetim
- ✅ Kolay özelleştirme
- ✅ Tutarlı tasarım
- ✅ Performans iyileştirmesi
- ✅ Bakım kolaylığı

## 🌐 Tarayıcı Desteği

- ✅ Chrome 76+
- ✅ Firefox 103+
- ✅ Safari 9+
- ✅ Edge 79+

## 📖 Örnekler

Canlı örnekleri görmek için `glass-card-examples.html` dosyasını açın.

## 🔧 Yeni Varyant Ekleme

```css
.glass-card--custom {
    padding: 2.5rem;
    max-width: 35rem;
    border-radius: 2rem;
}
```

## 💡 İpuçları

1. Her zaman `.glass-card` ile başlayın
2. Varyantları birleştirebilirsiniz
3. CSS değişkenlerini kullanarak özelleştirin
4. Inline style ile özel boyutlar ekleyin

## 📚 Daha Fazla Bilgi

Detaylı dokümantasyon için `GLASSMORPHISM-REFACTOR.md` dosyasına bakın.

---

**Versiyon:** 1.0  
**Durum:** ✅ Tamamlandı
