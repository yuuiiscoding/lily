// تغيير نص الحقل بناء على اختيار "كامل المنتج" أو "كمية محددة"
function updateLabelModeText() {
  const mode = document.querySelector('input[name="labelMode"]:checked').value;
  const label = document.getElementById('labelConsumedLabel');
  if (mode === 'full') {
    label.innerText = 'الوزن الصافي للمنتج (غ):';
  } else {
    label.innerText = 'وزن الأكل (غ):';
  }
}
document.querySelectorAll('input[name="labelMode"]').forEach(r => {
  r.addEventListener('change', updateLabelModeText);
});
updateLabelModeText();


// الطريقة 1
function calcCarb100() {
  const weight = parseFloat(document.getElementById('weight1').value);
  const carbPer100 = parseFloat(document.getElementById('carbPer100').value);
  if (isNaN(weight) || isNaN(carbPer100)) {
    document.getElementById('result1').innerText = 'الرجاء إدخال الوزن وكمية الكارب لكل 100غ.';
    return;
  }
  const carb = (weight * carbPer100) / 100;
  document.getElementById('result1').innerText = `مقدار الكارب: ${carb.toFixed(1)} غ`;
  document.getElementById('totalCarb').value = carb.toFixed(1);
}

// الطريقة 2
function calcCarbFood() {
  const weight = parseFloat(document.getElementById('weight2').value);
  const typePct = parseFloat(document.getElementById('foodType').value);
  if (isNaN(weight) || isNaN(typePct)) {
    document.getElementById('result2').innerText = 'الرجاء إدخال الوزن واختيار نوع الأكل.';
    return;
  }
  const carb = (weight * typePct) / 100;
  document.getElementById('result2').innerText = `مقدار الكارب (تقريبياً): ${carb.toFixed(1)} غ`;
  document.getElementById('totalCarb').value = carb.toFixed(1);
}

// الطريقة 3 - من الملصق الغذائي (كامل المنتج أو كمية محددة)
function calcCarbLabel() {
  const mode = document.querySelector('input[name="labelMode"]:checked').value;
  const consumed = parseFloat(document.getElementById('labelConsumedWeight').value);
  const infoWeight = parseFloat(document.getElementById('labelWeight').value);
  const infoCarb = parseFloat(document.getElementById('labelCarb').value);

  if (isNaN(consumed) || isNaN(infoWeight) || isNaN(infoCarb)) {
    document.getElementById('result3').innerText = 'الرجاء إدخال جميع الحقول: الوزن (المنتج/المأكول)، الوزن في المعلومات، وكارب الملصق.';
    return;
  }
  if (infoWeight === 0) {
    document.getElementById('result3').innerText = 'قيمة "الوزن في المعلومات الغذائية" لا يمكن أن تكون صفر.';
    return;
  }

  // القاعدة: الكارب = (الوزن الذي نريد حسابه × كمية الكارب في الملصق) ÷ الوزن في المعلومات الغذائية
  const carb = (consumed * infoCarb) / infoWeight;
  document.getElementById('result3').innerText = `مقدار الكارب: ${carb.toFixed(1)} غ`;
  document.getElementById('totalCarb').value = carb.toFixed(1);
}

// الطريقة 4 - جرعة الإنسولين
function calcInsulin() {
  const totalCarb = parseFloat(document.getElementById('totalCarb').value);
  const ratio = parseFloat(document.getElementById('ratio').value);
  if (isNaN(totalCarb) || isNaN(ratio)) {
    document.getElementById('result4').innerText = 'الرجاء إدخال مجموع الكارب ومعامل الكارب.';
    return;
  }
  if (ratio === 0) {
    document.getElementById('result4').innerText = 'معامل الكارب لا يمكن أن يكون صفر.';
    return;
  }
  const insulin = totalCarb / ratio;
  document.getElementById('result4').innerText = `جرعة الإنسولين: ${insulin.toFixed(1)} وحدة`;
}