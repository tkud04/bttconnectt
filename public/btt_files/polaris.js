/**
 * @name Polaris navigation
 * @author SapientNitro, London
 * @developer ariva1
 * @copyright Copyright (c) 2013
 * @license none/private/BTB
 * @requires jQuery ($)
 */

var BTB = window.BTB || {};

BTB.polarisNavigation = {

    options: {
        polaris: jQuery('.polaris'),
        selectedKlass: 'polaris-selected'
    },
    
    setupPrimaryLevel: function(element, namespace, addParentHeight) {
    
        var _self = this;
        
        element.find('> li > a').bind('click.' + namespace, function(event) {
            
            var parent = jQuery(this).parent();
            
            if(parent.hasClass(_self.options.selectedKlass)) {
            
                parent.removeClass(_self.options.selectedKlass);
                
            } else {
            
                element.find('> li').removeClass(_self.options.selectedKlass);
                
                parent.addClass(_self.options.selectedKlass);
                
            }
            
            _self.setMargin(element, addParentHeight);
            
            return false;
           
        });
        
    },
    
    setupSubLevels: function(subLevels, namespace, primaryLevel, addParentHeight) {
        
        var _self = this;
        
        jQuery.each(subLevels, function() {
            
            jQuery(this).find('> li > a').bind('click.' + namespace, function(event) {
            
                var parent = jQuery(this).parent();
                
                parent.toggleClass(_self.options.selectedKlass);
                
                _self.setMargin(primaryLevel, addParentHeight);
                
                if(parent.hasClass(_self.options.selectedKlass)) {
                    jQuery('html, body').animate({
                        scrollTop: parent.offset().top
                    }, 600);
                }
                
                return false;
                
            });
            
        });
        
    },
    
    setupPrimaryLevelOver: function(element, namespace) {
    
        var _self = this;
        
        //we dont use hover as the user may have the mouse positioned on top on the menu item on load
        element.find('> li').bind('mouseenter.' + namespace, function() {
            
            jQuery(this).addClass(_self.options.selectedKlass);
            
            _self.setEqualColumns(element.find('> li > div > .gw'));
            
            return false;
           
        }).bind('mouseleave.' + namespace, function() {
            
            jQuery(this).removeClass(_self.options.selectedKlass);
            
            _self.setEqualColumns(element.find('> li > div > .gw'));
            
            return false;
            
        });
        
    },
    
    removeElementEvents: function(array) {
        
        jQuery.each(array, function() {
            
            var element = jQuery(this)[0],
                eventName = jQuery(this)[1],
                namespace = jQuery(this)[2];
            
            element.unbind(eventName + '.' + namespace);
            
        });
    },
    
    resetSelected: function() {
        this.options.polaris.find('.' + this.options.selectedKlass).removeClass(this.options.selectedKlass);
    },
    
    resetEqualColumns: function() {
        this.options.polaris.find('li > div > .gw > .g').removeAttr('style');
    },
    
    setMargin: function(primaryLevel, addParentHeight) {
        
        var clickedElementHeight = (addParentHeight == true) ? this.getMaxHeight(primaryLevel.children()) : 0,
            selectedContentHeight = primaryLevel.find('> .' + this.options.selectedKlass).children('div').outerHeight(true);
        
        this.options.polaris.css('margin-bottom', clickedElementHeight + selectedContentHeight);
        
    },
    
    getMaxHeight: function(elements) {
        return Math.max.apply(null, elements.map(function() {
            return jQuery(this).outerHeight();
        }).get());
    },
    
    setEqualColumns: function(element) {
        var children = element.children();
        
        children.css('min-height', this.getMaxHeight(children));
    }
    
}

jQuery(document).ready(function() {

    enquire.register('screen and (max-width:40.063em)', {
        match: function() {
        
            //console.log('[Mobile: matched]');
            
            var primaryLevel = jQuery('.polaris-l1');
            
            BTB.polarisNavigation.setupPrimaryLevel(primaryLevel, 'Primary_L1', false);
            
            BTB.polarisNavigation.setupSubLevels(jQuery('.polaris-l2'), 'Primary_L23', primaryLevel, false);
            
            BTB.polarisNavigation.setMargin(primaryLevel, false);
            
        },
        unmatch: function() {
            
            //console.log('[Mobile: unmatched]');
            
            BTB.polarisNavigation.removeElementEvents([[jQuery('.polaris-l1').find('> li > a'), 'click', 'Primary_L1'], [jQuery('.polaris-l2').find('> li > a'), 'click', 'Primary_L23']]);
            
            BTB.polarisNavigation.resetSelected();
            
        }
    
   }).register('screen and (min-width:40.063em)', {
    // }).register('screen and (min-width:1px)', {
        match: function() {
        
            //console.log('[Desktop: matched]');
            
            var primaryLevel = jQuery('.polaris-l2');
            
            BTB.polarisNavigation.setMargin(primaryLevel, true);
            
            BTB.polarisNavigation.setupPrimaryLevelOver(jQuery('.polaris-l2'), 'PrimaryHover_L2');
            
        },
        unmatch: function() {
        
            //console.log('[Desktop: unmatched]');
            
            BTB.polarisNavigation.removeElementEvents([[jQuery('.polaris-l2').find('> li'), 'mouseenter', 'PrimaryHover_L2']]);
            
            BTB.polarisNavigation.removeElementEvents([[jQuery('.polaris-l2').find('> li'), 'mouseleave', 'PrimaryHover_L2']]);
            
            BTB.polarisNavigation.resetSelected();
            
            BTB.polarisNavigation.resetEqualColumns();
            
        }
    }, true);
    
});

