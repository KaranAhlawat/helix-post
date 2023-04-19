(ns todo.components.other
  (:require [todo.styles.other :as other]
            [helix.core :refer [defnc]]
            [helix.dom :as d]))

(defnc other-comp
  []
  {:helix/features {:fast-refresh true}}
  (d/button
   {:class other/button}
   "This is a button"))
