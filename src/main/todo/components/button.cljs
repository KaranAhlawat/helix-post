(ns todo.components.button
  (:require [helix.core :refer [defnc]]
            [helix.dom :as d]
            [todo.styles.components.button-module :as css]))

(defnc some-button
  []
  {:helix/features {:fast-refresh true}}
  (d/button
   {:class css/button
    :on-click #(js/alert "Boop")}
   "This is a button"))