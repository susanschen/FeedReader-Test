/* global describe, it, expect, $, beforeEach, beforeAll, allFeeds, loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a defined URL', function(){
            for (var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a defined name', function() {
            for (var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /*  Test suite "The menu" */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when menu icon is clicked', function(){
            // displays menu when clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // hides menu when clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        // loadFeed() is asynchronous so this test will require
        // the use of Jasmine's beforeEach and asynchronous done() function.
        beforeEach(function(done){
            // simplified version since anonymous callback function has no code
            loadFeed(0, done);
        });

        it('has at least one entry element when loadFeed completes', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /*  Test suite "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* A test that ensures when a new feed selection is loaded
         * by the loadFeed function that the content actually changes.
         */
        var oldFeed, newFeed;

        // loadFeed() is asynchronous
        beforeEach(function(done){

            // 0 is the ID for the first feed selection "Udacity Blog"
            loadFeed(0, function(){
                // All code inside this anonymous callback function
                // will run after loadFeed(0) has finished successfully
                oldFeed = $('.feed .entry').text();
                // console.log('Old: ' + oldFeed); // shows Udacity Blog feeds

                // 1 is the ID for the second feed selection "CSS Tricks"
                loadFeed(1, function() {
                    // All code here will run after loadFeed(1) has finished successfully
                    newFeed = $('.feed .entry').text();
                    // console.log('New: ' + newFeed); // shows CSS Tricks feeds
                    done();
                });
            });
            // Any code here will run immediately after loadFeed(0) is called.
            // It will not wait for async loadFeed() to finish.
        });

        it('changes the content', function(){
            expect(oldFeed.length).toBeGreaterThan(0);
            expect(newFeed.length).toBeGreaterThan(0);
            expect(newFeed).not.toBe(oldFeed);
        });
    });

}());
