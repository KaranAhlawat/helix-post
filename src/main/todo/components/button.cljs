(ns todo.components.button
  (:require [helix.core :refer [defnc]]
            [helix.dom :as d]
            [todo.styles.components.button-module :as styles]))

(defnc some-button
  []
  {:helix/features {:fast-refresh true}}
  (d/button
   {:class styles/button
    :on-click #(js/alert "Boop")}
   "This is a button"))