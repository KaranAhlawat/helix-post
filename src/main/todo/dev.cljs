(ns todo.dev
  (:require [helix.experimental.refresh :as her]))

(her/inject-hook!)

(defn ^:dev/after-load refresh
  []
  (her/refresh!))
