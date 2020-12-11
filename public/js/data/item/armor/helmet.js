/**
 * Created with IntelliJ IDEA.
 * User: Mullanaphy
 * Date: 11/15/13
 * Time: 6:37 PM
 * To change this template use File | Settings | File Templates.
 */
define(['ramda', 'data/item/armor/base'], function(R, armorBase) {
  var helmet = R.clone(armorBase);
  helmet.name = 'Hatless';
  helmet.type = 'helmet';
  return helmet;
});