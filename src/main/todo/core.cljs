(ns todo.core
  (:require ["react" :as react]
            ["react-dom/client" :as rdom]
            [helix.core :refer [$ defnc]]
            [helix.dom :as d]
            [todo.components.button :refer [some-button]]
            [todo.components.final :refer [random-div]]
            [todo.components.hello :refer [hello]]
            [todo.styles.core :as styles]))

(defnc app
  []
  {:helix/features {:fast-refresh true}}
  (d/div
   {:class styles/div}
   (d/h1 "Helix + PostCSS")
   ($ hello)
   ($ some-button)
   ($ random-div)))

(defonce root (rdom/createRoot (js/document.getElementById "app")))

(defn ^:export init
  []
  (enable-console-print!)
  (println "Called init.")
  (.render root ($ react/StrictMode ($ app))))
