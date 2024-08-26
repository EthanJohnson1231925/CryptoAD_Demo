(() => {
  function e(e, a) {
    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (!n) {
      if (Array.isArray(e) || (n = function (e, a) {
          if (!e) return;
          if ("string" == typeof e) return t(e, a);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(e);
          if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return t(e, a)
        }(e)) || a && e && "number" == typeof e.length) {
        n && (e = n);
        var r = 0,
          i = function () {};
        return {
          s: i,
          n: function () {
            return r >= e.length ? {
              done: !0
            } : {
              done: !1,
              value: e[r++]
            }
          },
          e: function (e) {
            throw e
          },
          f: i
        }
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var o, s = !0,
      l = !1;
    return {
      s: function () {
        n = n.call(e)
      },
      n: function () {
        var e = n.next();
        return s = e.done, e
      },
      e: function (e) {
        l = !0, o = e
      },
      f: function () {
        try {
          s || null == n.return || n.return()
        } finally {
          if (l) throw o
        }
      }
    }
  }

  function t(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var a = 0, n = new Array(t); a < t; a++) n[a] = e[a];
    return n
  }
  $((function () {
    $(".main-sidebar a.dropdown-toggle").click((function (e) {
      e.preventDefault(), $(this).toggleClass("opened").next("ul").slideToggle()
    })), $(".main-content a.toggle-sidebar, .main-sidebar a.toggle-sidebar").click((function () {
      $(".main-sidebar").toggleClass("open")
    })), Ads.form.init($("form")), Ads.Utils.initTooltips(document.body), Ads.list.init($(document.body))
  })), Ads = {
    loader: {
      get: function (e) {
        var t = $(e),
          a = t.closest("form");
        if (1 === a.length) {
          var n = a.closest(".list-header");
          if (1 === n.length) {
            var r = n.find(".list-loader");
            return Ads.display(r, "prepare", "inline-block"), r
          }
          var i = a.closest(".row-extra").find(".overlay");
          return Ads.display(i, "prepare", "block"), i
        }
        var o = t.closest(".list-header");
        if (1 === o.length) {
          var s = o.next(".list-body").children(".overlay").first();
          return Ads.display(s, "prepare", "block"), s
        }
        var l = t.closest(".row-content");
        if (1 === l.length) {
          var d = l.siblings(".overlay").first();
          return Ads.display(d, "prepare", "block"), d
        }
        var c = t.closest("nav");
        if (1 === c.length) {
          var f = c.next(".overlay");
          return Ads.display(f, "prepare", "block"), f
        }
        return null
      },
      show: function (e) {
        var t = $(e).is(".list-loader , .overlay") ? $(e) : this.get(e);
        null !== t && Ads.display(t, "show")
      },
      hide: function (e) {
        var t = $(e).is(".list-loader , .overlay") ? $(e) : this.get(e);
        null !== t && t.css("display", "none")
      }
    },
    list: {
      init: function (e) {
        $("[data-sorting]", e).css("cursor", "pointer").click((function (e) {
          var t = $(e.currentTarget),
            a = t.closest(".list-body"),
            n = a.data("query") || {};
          n.sorting = t.data("sorting"), t.data("sorting-desc") ? n.sorting_desc = 1 : delete n.sorting_desc, Ads.list.refresh(a, n.page || null)
        }))
      },
      openExtra: function (e, t, a, n) {
        t = $(t);
        var r = $(e),
          i = r.parent(),
          o = i.find(".list-close"),
          s = Ads.loader.get(r),
          l = function (e) {
            i.children(".list-action").hide(), e.slideDown({
              start: function () {
                return e.css("display", "flex")
              },
              complete: function () {
                Ads.loader.hide(s), o.css("display", "inline")
              }
            })
          };
        Ads.loader.show(s), a ? $.get({
          url: CONFIG.BASE_URL + a,
          dataType: "html",
          success: function (a) {
            var r = $(a);
            t.replaceWith(r), Ads.Utils.initTooltips(r), n && n.call(this, r, e), l(r)
          },
          error: function (e) {
            console.log(e)
          }
        }) : l(t)
      },
      closeExtra: function (e, t, a) {
        e.slideUp({
          complete: function () {
            a && a.call(this, e)
          }
        }), t.find(".list-close").css("display", "none"), t.find(".list-loader").css("display", "none"), t.children(".list-action").fadeIn()
      },
      showForm: function (e, t, a) {
        Ads.list.openExtra(e, $(e).parent().siblings('form[data-name="' + t + '"]').first(), a, (function (e) {
          Ads.form.init(e)
        }))
      },
      closeForm: function (e) {
        var t, a, n = $(e);
        n.is("form") ? a = (t = n).siblings(".list-actions") : t = (a = n.parent()).siblings("form:visible"), Ads.list.closeExtra(t, a, (function (e) {
          e.each((function (e, t) {
            return Ads.form.reset(t, !0)
          }))
        }))
      },
      page: function (e, t) {
        this.refresh(e, t)
      },
      refresh: function (e, t) {
        var a = $(e),
          n = a.is(".list-body") ? a : a.closest(".list").find(".list-body"),
          r = n.data("url"),
          i = n.data("query") || {};
        t && (i.page = t), Ads.loader.show(a), $.get({
          url: CONFIG.BASE_URL + r,
          data: i,
          dataType: "html",
          success: function (e) {
            var t = n.parent();
            n.replaceWith(e), Ads.list.init(t), Ads.form.init(t.find("form")), Ads.Utils.initTooltips(t)
          },
          error: function (e) {
            console.log(e)
          }
        })
      },
      submitForm: function (e, t, a, n, r) {
        var i = $(e),
          o = i.closest("form");
        if (o[0].checkValidity()) {
          i.attr("disabled", "disabled");
          var s = {};
          if (o.is('[enctype="multipart/form-data"]')) {
            var l = new FormData(o[0]);
            if ("PUT" === t.toUpperCase() && (t = "POST", l.append("_method", "PUT"), void 0 !== r))
              for (var d in r) l.append(d, r[d]);
            s = {
              type: t,
              data: l,
              processData: !1,
              contentType: !1,
              xhr: function () {
                var e = new window.XMLHttpRequest;
                return e.upload.addEventListener("progress", (function (e) {
                  if (e.lengthComputable) {
                    var t = $(".form-progress div", o);
                    t.width(e.loaded / e.total * 100 + "%"), e.total === e.loaded && t.animate({
                      opacity: 0
                    }, 3e3, (function () {
                      return t.width(0).css("opacity", 1)
                    }))
                  }
                }), !1), e
              }
            }
          } else {
            var c = o.serialize();
            if (void 0 !== r)
              for (var f in r) r.hasOwnProperty(f) && (c += "&" + f + "=" + r[f]);
            s = {
              type: t,
              data: c,
              dataType: "json"
            }
          }
          Ads.loader.show(o), $.ajax($.extend(s, {
            url: CONFIG.BASE_URL + o.attr("action"),
            success: function (e) {
              a(e.result), i && i.removeAttr("disabled"), n && o && Ads.list.closeForm(o), e.alert && $(".alerts").append(e.alert)
            },
            error: function (e, t, a) {
              var n = e.responseJSON ? e.responseJSON.errors : {
                form: e.status + ": " + t + " " + a
              };
              console.log(n), Object.keys(n).forEach((function (e) {
                var t = o.find('[name="' + e + '"]');
                if (t.length > 0) {
                  t.addClass("is-invalid");
                  var a = ($.isArray(n[e]) ? n[e] : [n[e]]).join("");
                  t.after('<span class="invalid-feedback" role="alert">' + a + "</span>")
                }
              })), n.form && o.prepend('<div role="alert" class="invalid-feedback d-block ml-3">' + n.form + "</div>"), i.removeAttr("disabled")
            }
          }))
        } else o[0].reportValidity()
      },
      submitAddForm: function (e) {
        this.submitForm(e, "POST", (function (t) {
          return $(e).closest(".list").find(".list-rows li.header").after(t)
        }), !0)
      },
      submitSearchForm: function (e) {
        var t = $(e).prop("disabled", !1).closest("form"),
          a = t.closest(".list").find(".list-body");
        a.data("url", t.attr("action")), a.data("query", Ads.Utils.serializeObject(t)), this.refresh(a)
      }
    },
    item: {
      openExtra: function (e) {
        var t = $(e),
          a = t.data("query") || {},
          n = t.data("url"),
          r = t.parent(),
          i = r.is(".row-actions") ? r : r.find(".row-actions").first(),
          o = t.closest(".row-content").siblings(".row-extra").first(),
          s = Ads.loader.get(t);
        Ads.loader.show(s), $.get({
          url: CONFIG.BASE_URL + n,
          data: a,
          dataType: "html",
          success: function (e) {
            e = $(e), Ads.loader.hide(s), o.find(".extra-content").empty().append(e), i && i.find(".row-action").css("visibility", "hidden"), o.slideDown("fast", (function () {
              o.css("height", "auto"), o.find(".extra-close").css("display", "block"), Ads.form.init(o.find("form")), Ads.Utils.initTooltips(o)
            }))
          },
          error: function (e) {
            console.log(e)
          }
        })
      },
      closeExtra: function (e, t) {
        var a = $(e).fadeOut("fast").closest(".row-extra");
        a.slideUp({
          duration: "fast",
          complete: t || function () {
            a.find(".extra-content").empty()
          }
        }), a.prev(".row-content").find(".row-action").css("visibility", "visible")
      },
      updateRow: function (e, t) {
        if (!t || confirm(t)) {
          var a = $(e),
            n = a.data("query") || {},
            r = a.data("url"),
            i = a.closest(".row-content");
          Ads.loader.show(a), $.ajax({
            type: "PUT",
            url: CONFIG.BASE_URL + r,
            data: n,
            dataType: "html",
            success: function (e) {
              var t = i.parent("div"),
                a = $(e);
              t.animate({
                opacity: .05
              }, {
                complete: function () {
                  t.replaceWith(a), a.animate({
                    opacity: 1
                  }), Ads.Utils.initTooltips(a)
                }
              })
            },
            error: function (e) {
              console.log(e);
              var t = "Error";
              try {
                var n = JSON.parse(e.responseText);
                n.hasOwnProperty("errors") && (n.errors.hasOwnProperty("form") ? t = n.errors.form : Object.keys(n.errors).length > 0 && (t = Object.keys(n.errors).map((function (e) {
                  return e + ": " + n.errors[e]
                })).join(". ") + ". "))
              } catch (a) {
                t = e.responseText || t
              }
              Ads.loader.hide(a), Ads.Utils.alert(t)
            }
          })
        }
      },
      deleteRow: function (e) {
        if (confirm("Are you sure?")) {
          var t = $(e),
            a = t.data("url"),
            n = t.data("query") || {};
          Ads.loader.show(e), $.ajax({
            type: "DELETE",
            url: CONFIG.BASE_URL + a,
            data: n,
            dataType: "html",
            success: function (a) {
              if ("1" === a) {
                var n = t.closest("div");
                n.fadeOut({
                  complete: function () {
                    n.remove()
                  }
                })
              } else Ads.loader.hide(e), Ads.Utils.alert(a)
            },
            error: function (t, a, r) {
              Ads.loader.hide(e), console.log(n), Ads.Utils.alert(t.status + ": " + r)
            }
          })
        }
      },
      submitForm: function (e, t) {
        var a = $(e).closest(".row-extra");
        Ads.list.submitForm(e, "PUT", (function (e) {
          Ads.item.closeExtra(a.find(".extra-close"), (function () {
            var t = a.closest("div"),
              n = $(e);
            t.animate({
              opacity: .05
            }, {
              complete: function () {
                t.replaceWith(n), n.animate({
                  opacity: 1
                }), Ads.Utils.initTooltips(n)
              }
            })
          }))
        }), void 0, t)
      }
    },
    form: {
      init: function (e) {
        $("select:not(.simpleselect)").selectpicker(), $(".slider").each((function (e, t) {
          if (void 0 === t.noUiSlider) {
            var a = $(t),
              n = {
                min: parseFloat(a.data("min")),
                max: parseFloat(a.data("max"))
              };
            if (n.min !== n.max) {
              a.customSlider({
                start: parseFloat(a.data("start")),
                range: n,
                connect: "lower",
                pips: {
                  mode: "values",
                  values: a.data("values").split(",").map((function (e) {
                    return parseFloat(e)
                  })),
                  density: 1
                }
              });
              var r = a.prev("div").find("input");
              r.on("change", (function () {
                return t.noUiSlider.set(r.val())
              })), t.noUiSlider.on("update", (function (e, t) {
                return r.val(e[t])
              }))
            }
          }
        })), $(e).off("submit").on("submit", (function (e) {
          var t = $("button.submit", this);
          1 === t.length && (e.preventDefault(), t[0].click())
        })), $(".datepicker-field").datepicker({
          format: "yyyy-mm-dd"
        }), $(".rel-parent", e).trigger("change"), $("select.trigger-change", e).trigger("change")
      },
      handleRelations: function (e) {
        $.each(e.find("[data-rel]"), (function (t, a) {
          var n = $(a);
          $.each(n.data("rel"), (function (t, a) {
            n = n.closest(".form-group");
            var r = e.find('[name="' + t + '"]').first();
            !r.is(":visible") || !($.isArray(a) ? a : [a]).includes(r.val()) ? n.is(":visible") && (n.is("[required]") && (n.attr("data-required", !0), n.removeAttr("required")), Ads.display(n, "hide")) : n.is(":visible") || (n.is("[data-required]") && (n.attr("required", !0), n.removeAttr("data-required")), Ads.display(n, "show"))
          }))
        }))
      },
      reset: function (e, t) {
        var a = $(e);
        a.find(".invalid-feedback").remove(), a.find(".dynamic-info").remove(), a.find(".dynamic-info-container").each((function (e, t) {
          $(t).is("canvas") ? Ads.Utils.emptyCanvas(t) : $(t).empty()
        })), a.find(".is-invalid").removeClass("is-invalid"), $("select:not(.simpleselect)").val("").trigger("change"), t ? e.reset() : a.find("[onchange]").trigger("change")
      },
      legendToggle: function (e) {
        $(e).closest("fieldset").find("input[type=checkbox]").not(".legend input").prop("checked", e.checked)
      },
      relations: function (e) {
        var t = $(e),
          a = t.find(":selected").val(),
          n = t.attr("name");
        t.closest("form").find("[data-" + n + "]").each((function (e, t) {
          var r = $(t),
            i = r.data(n).split(",");
          i.includes(a) ? r.is("[data-required]") && r.attr("required", !0).removeAttr("data-required") : r.is("[required]") && r.attr("data-required", !0).removeAttr("required");
          var o = r.is("[data-ad-type-no-container]") ? r : r.closest(".form-group");
          Ads.display(o, i.includes(a) ? "show" : "hide")
        }))
      }
    },
    display: function (e, t, a) {
      void 0 === t || "show" === t ? e.css("display", $.data(e, "display-attribute") || "block") : "hide" === t ? (this.display(e, "prepare"), e.css("display", "none")) : "prepare" === t && $.data(e, "display-attribute", a || e.css("display"))
    },
    Modules: {
      Ads: {
        form: {
          relations: function (e) {
            var t = $(e),
              a = t.find(":selected").data("type");
            t.closest("form").find("[data-ad-type]").each((function (e, t) {
              var n = $(t),
                r = n.data("ad-type").split(",");
              r.includes(a) ? n.is("[data-required]") && n.attr("required", !0).removeAttr("data-required") : n.is("[required]") && n.attr("data-required", !0).removeAttr("required");
              var i = n.is("[data-ad-type-no-container]") ? n : n.closest(".form-group");
              Ads.display(i, r.includes(a) ? "show" : "hide")
            }))
          }
        }
      },
      Profile: {
        submitForm: function (e) {
          Ads.list.submitForm(e, "put", (function (t) {
            $(e).closest(".list").replaceWith(t.list), $(".alerts").append(t.alert), Ads.form.init($("form"))
          }))
        }
      },
      CampaignsCountries: {
        submitForm: function (e) {
          Ads.list.submitForm(e, "put", (function () {
            return Ads.item.closeExtra(e)
          }))
        },
        changeCategory: function (e) {
          var t = $("option:selected", $(e)),
            a = t.closest("form"),
            n = 0 === t.val().length,
            r = t.data("cost"),
            i = JSON.parse(atob(t.data("countries") || "e30="));
          $("label[for^=countries]", a).each((function (e, t) {
            var a = (t = $(t)).attr("for").substring(10, 12),
              o = t.html().split(":");
            t.html(o[0] + (n ? "" : ": $" + parseFloat(i[a] || r).toFixed(5)))
          }));
          var o = $('label[for="Tier 4"]', a),
            s = o.html().split(":");
          o.html(s[0] + (n ? "" : ": $" + parseFloat(t.data("tier4") || r).toFixed(5)))
        }
      },
      Invoices: {
        showWalletInfo: function (e) {
          var t = (e = $(e)).closest(".form-group").next(".wallet-info"),
            a = e.find(":selected").data("wallet"),
            n = t.find("h5"),
            r = t.find("canvas").first()[0],
            i = e.closest("form"),
            o = i.find("[name=wallet]");
          0 === o.length && (o = $('<input type="hidden" name="wallet"/>').appendTo(i)), o.val(a || ""), a ? (n.text(a), QRCode.toCanvas(r, a, {
            errorCorrectionLevel: "H",
            scale: 6
          }), this.invoicesAmountChange(i.find("[name=amount]"))) : (n.empty(), Ads.Utils.emptyCanvas(r))
        },
        invoicesAmountChange: function (e) {
          var t = (e = $(e)).val(),
            a = e.closest("form").find("[name=currency] option:selected");
          if (a.length > 0) {
            var n = a.val(),
              r = a.data("rate"),
              i = e.closest(".row").find(".crypto-amount"),
              o = "";
            isNaN(t) || isNaN(r) || (o = parseFloat((t * r).toFixed(CONFIG.DECIMALS))), i.html("<b>" + o + " " + n + "</b>")
          }
        },
        currencySelectChange: function (e) {
          this.invoicesSelectChange($(e).closest("form").find('[name="invoices[]"]'))
        },
        invoicesSelectChange: function (e) {
          e = $(e);
          var t = 0;
          e.find("option:selected").each((function (e, a) {
            t += parseFloat(a.dataset.amount)
          }));
          var a = e.closest("form");
          a.find(".total-amount").text((t < 0 ? "-" : "") + "$" + Math.abs(t).toFixed(2));
          var n = a.find("[name=currency] option:selected");
          if (n.length > 0) {
            var r = n.val(),
              i = n.data("rate"),
              o = a.find(".crypto-amount"),
              s = "";
            isNaN(i) || (s = parseFloat((t * i).toFixed(CONFIG.DECIMALS))), o.html(s + " " + r)
          }
        },
        verifyPromo: function (e) {
          var t = $(e),
            a = $("#promo-profit"),
            n = $("#promo").val();
          n.length > 0 && $.ajax({
            method: "GET",
            url: t.data("url"),
            data: {
              code: n
            },
            dataType: "json",
            beforeSend: function () {
              a.html("Verifying..."), t.attr("disabled", !0)
            },
            success: function (e) {
              e && e.hasOwnProperty("result") && a.html("Bonus: %" + parseFloat(e.result)), t.attr("disabled", !1)
            },
            error: function (e) {
              var n = "Please try again later.";
              try {
                n = e.responseJSON.errors.form
              } catch (e) {}
              a.html(n), t.attr("disabled", !1)
            }
          })
        },
        showWithdrawalRequests: function (e, t, a) {
          if ("none" === t.css("display")) {
            e = $(e);
            var n = Ads.loader.get(e);
            Ads.loader.show(n), $.get({
              url: CONFIG.BASE_URL + a,
              dataType: "html",
              success: function (a) {
                e.addClass("d-none"), t.html(a).removeClass("d-none"), $("html, body").animate({
                  scrollTop: t.offset().top
                }, 1e3), Ads.Utils.initTooltips(t), Ads.loader.hide(n)
              },
              error: function (e) {
                console.log(e)
              }
            })
          }
        }
      },
      EmailsTemplates: {
        attachments: {
          add: function (e) {
            var t = $(e).parent(),
              a = -1;
            t.closest("form").find("[data-index]").each((function (e, t) {
              var n = parseInt(t.dataset.index);
              a = n > a ? n : a
            }));
            var n = a + 1,
              r = t.nextAll(".template").clone(!0).removeClass("template").removeClass("d-none");
            r.find('[for="attachment-name"] , [for="attachment-file"], [for="attachment-inline"]').each((function (e, t) {
              t.for = "attachment[" + n + "][" + ("attachment-name" === t.for ? "name" : "attachment-file" === t.name ? "file" : "inline") + "]"
            })), r.find('[name="attachment-name"] , [name="attachment-file"], [name="attachment-inline"]').each((function (e, t) {
              var a = "attachment-name" === t.name ? "name" : "attachment-file" === t.name ? "file" : "inline";
              t.id = "attachment[" + n + "][" + a + "]", t.name = "attachment[" + n + "][" + a + "]", t.dataset.index = n
            })), r.insertAfter(t)
          },
          remove: function (e) {
            var t = $(e).closest(".attach");
            t.prev(".attach").remove(), t.remove()
          },
          removeFixed: function (e) {
            $(e).closest(".attach").remove()
          }
        }
      },
      Captcha: {
        reload: function (e) {
          $(e).load(CONFIG.BASE_URL + "/refresh-captcha")
        }
      }
    },
    Utils: {
      emptyCanvas: function (e) {
        e.getContext("2d").clearRect(0, 0, e.width, e.height)
      },
      getFormData: function (t) {
        var a, n = new FormData(t[0]),
          r = [],
          i = e(n.entries());
        try {
          for (i.s(); !(a = i.n()).done;) {
            var o = a.value;
            void 0 !== o[1] && null !== o[1] && "" !== o[1] || r.push(o[0])
          }
        } catch (e) {
          i.e(e)
        } finally {
          i.f()
        }
        return r.forEach((function (e) {
          return n.delete(e)
        })), n
      },
      serializeObject: function (e) {
        var t = {};
        return e.serializeArray().forEach((function (e) {
          e.value.length > 0 && (t[e.name] ? (t[e.name].push || (t[e.name] = [t[e.name]]), t[e.name].push(e.value)) : t[e.name] = e.value)
        })), t
      },
      go: function (e, t, a) {
        a && !confirm(a) || window.open(CONFIG.BASE_URL + e, t ? "_blank " : "_self")
      },
      countdown: function (e, t, a) {
        var n = setInterval((function () {
          $(e).html(String(Math.floor(t / 6e4)).padStart(2, "0") + ":" + String(Math.floor(t % 6e4 / 1e3)).padStart(2, "0")), t < 0 && (clearInterval(n), $(e).html(a)), t -= 1e3
        }), 1e3)
      },
      initTooltips: function (e) {
        $('[data-toggle="tooltip"]', e).each((function (e, t) {
          return $(t).tooltip({
            container: t.parentElement
          })
        }))
      },
      submitAction: function (e) {
        (e = $(e)).data("confirm") && !confirm(e.data("confirm")) || $.ajax({
          method: "POST",
          url: e.data("url"),
          data: e.data("params") || [],
          dataType: "html",
          beforeSend: function () {
            e.attr("disabled", !0)
          },
          success: function (t) {
            t ? e.replaceWith(t) : e.attr("disabled", !1)
          },
          error: function (t, a, n) {
            var r = t.responseText ? t.responseText : t.status + ": " + a + " " + n;
            console.log(r), Ads.Utils.alert(r), e.attr("disabled", !1)
          }
        })
      },
      alert: function (e, t) {
        t = t || "Warning";
        var a = $("#alert-modal");
        $(".modal-title", a).html(t), $(".modal-message", a).html(e), a.modal("show")
      }
    }
  }, GDPR = {
    agree: function (e) {
      e ? (Cookies.set(e, !0, {
        expires: 365,
        path: "/"
      }), GDPR.flag()) : (GDPR.agree("gdpr-functionality-cookies"), GDPR.agree("gdpr-targeting-cookies"), GDPR.agree("gdpr-tracking-cookies"), $(".promo-popup").hide())
    },
    decline: function (e) {
      e ? (Cookies.remove(e), GDPR.flag()) : (GDPR.decline("gdpr-functionality-cookies"), GDPR.decline("gdpr-targeting-cookies"), GDPR.decline("gdpr-tracking-cookies"), $(".promo-popup").hide())
    },
    toggle: function (e, t) {
      t ? GDPR.agree(e) : GDPR.decline(e)
    },
    flag: function () {
      Cookies.set("gdpr", !0, {
        expires: 365,
        path: "/"
      })
    },
    get: function (e) {
      return !!Cookies.get(e)
    }
  }
})();
//# sourceMappingURL=scripts.js.map