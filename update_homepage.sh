cat << 'DIFF' > patch.diff
--- src/pages/HomePage/HomePage.jsx
+++ src/pages/HomePage/HomePage.jsx
@@ -336,9 +336,10 @@
             <div className="calculator-card" data-aos="fade-up">
               <div className="calculator-inputs">
                 <div className="calc-input-group">
-                  <label className="calc-label">Built-up Area (sq.ft)</label>
+                  <label htmlFor="calc-area" className="calc-label">Built-up Area (sq.ft)</label>
                   <input
+                    id="calc-area"
                     type="number"
                     className="calc-input"
                     placeholder="Enter area in sq.ft"
@@ -348,9 +349,10 @@
                   />
                 </div>
                 <div className="calc-input-group">
-                  <label className="calc-label">
+                  <label htmlFor="calc-rate" className="calc-label">
                     Construction Rate (₹/sq.ft)
                   </label>
                   <input
+                    id="calc-rate"
                     type="number"
                     className="calc-input"
                     placeholder="Enter rate per sq.ft"
DIFF
patch -p0 < patch.diff
